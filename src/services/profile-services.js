const { sequelize } = require('../models')
const { getTotalOfJobsToPay } = require('./job-services')
const { safeMultiply, safeAdd, safeSubtract, assertRecordFound } = require('../utils')

const { Profile } = sequelize.models

/**
 * Deposit funds to a client's profile
 * @param {number} userId
 * @param {number} amount
 * @returns {Promise<{profile: Profile, totalPendingAmount: number}>}
 */
const depositFunds = async (userId, amount) => {
  if (!userId || !amount) {
    throw new Error('Invalid parameters')
  }

  try {
    const updatedProfile = await sequelize.transaction(async (t) => {
      const totalPendingAmount = await getTotalOfJobsToPay(userId, t)

      const profile = await Profile.findByPk(userId, { transaction: t })
      assertRecordFound(profile, 'Profile', userId)

      const updatedBalance = safeAdd(profile.balance, amount)
      const maxAmount = safeMultiply(totalPendingAmount, 1.25)

      if (updatedBalance > maxAmount) {
        const maxDepositAmount = safeSubtract(maxAmount, profile.balance)

        let maxDepositErrorMsg = `You cannot deposit more than $${maxDepositAmount}`
        if (maxDepositAmount < 0) {
          maxDepositErrorMsg = `You have reached the deposit limit, please pay your pending jobs first`
        }
        const maxDepositError = new Error(maxDepositErrorMsg)
        maxDepositError.statusCode = 400
        throw maxDepositError
      }

      profile.balance = updatedBalance
      await profile.save({ transaction: t })

      return { profile, totalPendingAmount }
    })

    return updatedProfile
  } catch (err) {
    throw err
  }
}

module.exports = {
  depositFunds,
}
