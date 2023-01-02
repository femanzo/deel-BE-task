import type { Transaction } from 'sequelize'

import { sequelize } from '../db'
import { safeMultiply, safeAdd, safeSubtract, ApiError } from '../utils'
import { getProfileById } from './db-services'

import { Job, Contract } from '../models'

/**
 * Deposit funds to a client's profile
 * @param {number} userId
 * @param {number} amount
 * @returns {Promise<{profile: Profile, totalPendingAmount: number}>}
 * @throws {Error} - If userId is not provided
 * @throws {Error} - If amount is invalid
 * @throws {Error} - If the deposit amount is greater than the max amount
 */
export const depositFunds = async (userId: number, amount: number) => {
  if (!userId || !amount) throw new Error('Invalid parameters')

  try {
    const updatedProfile = await sequelize.transaction(async (t: Transaction) => {
      const totalPendingAmount = await getTotalOfJobsToPay(userId, t)

      const profile = await getProfileById(userId, t)

      if (!profile) throw new ApiError('Profile not found', 404)

      if (profile.type !== 'client') throw new ApiError('Only clients can deposit funds', 400)

      const updatedBalance = safeAdd(profile.balance, amount)
      const maxAmount = safeMultiply(totalPendingAmount, 1.25)

      if (updatedBalance > maxAmount) {
        const maxDepositAmount = safeSubtract(maxAmount, profile.balance)

        let maxDepositErrorMsg = `The deposit amount is greater than the max permitted amount`
        if (maxDepositAmount <= 0) {
          maxDepositErrorMsg = `You have reached the deposit limit`
        }

        throw new ApiError(maxDepositErrorMsg, 400)
      }

      await addToBalance(userId, amount, t)

      return { message: `$${amount} deposited successfully` }
    })

    return updatedProfile
  } catch (err) {
    throw err
  }
}

/**
 * Add funds to a profile's balance
 * @param {number} profileId
 * @param {number} amount
 * @param {Sequelize.Transaction} transaction
 * @returns {Promise<Profile>}
 */
export const addToBalance = async (
  profileId: number,
  amount: number,
  transaction: Transaction | null = null
) => {
  if (!profileId) throw new Error('profileId required')
  if (!amount || amount < 0) throw new Error('invalid amount')

  const profile = await getProfileById(profileId, transaction)

  if (!profile) throw new Error(`Profile #${profileId} not found`)

  profile.balance = safeAdd(profile.balance, amount)

  await profile.save({ transaction })

  return profile
}

/**
 * Remove funds from a profile's balance
 * @param {number} profileId
 * @param {number} amount
 * @param {Sequelize.Transaction} transaction
 * @returns {Promise<Profile>}
 */
export const removeFromBalance = async (
  profileId: number,
  amount: number,
  transaction: Transaction | null = null
) => {
  if (!profileId) throw new Error('profileId required')
  if (!amount || amount < 0) throw new Error('invalid amount')

  const profile = await getProfileById(profileId, transaction)
  if (!profile) throw new ApiError(`Profile #${profileId} not found`, 404)

  profile.balance = safeSubtract(profile.balance, amount)

  if (profile.balance < 0) throw new ApiError('Insufficient funds', 400)

  await profile.save({ transaction })

  return profile
}

/**
 * transfer funds from a profile's to another
 * @param {number} fromProfileId
 * @param {number} toProfileId
 * @param {number} amount
 * @param {Sequelize.Transaction} transaction
 */
export const transferFunds = async (
  fromProfileId: number,
  toProfileId: number,
  amount: number,
  transaction: Transaction
) => {
  if (!fromProfileId) throw new Error('fromProfileId required')
  if (!toProfileId) throw new Error('toProfileId required')
  if (!amount || amount < 0) throw new Error('invalid amount')
  if (!transaction) throw new Error('transaction required')

  await removeFromBalance(fromProfileId, amount, transaction)
  await addToBalance(toProfileId, amount, transaction)
}

/**
 * Return the total amount of jobs to pay for a user
 * @param {number} clientId
 * @param {transaction} seequelize transaction
 * @returns {Promise<number>} - The total amount
 */
export const getTotalOfJobsToPay = async (
  clientId: number,
  transaction: Transaction | null = null
) => {
  if (!clientId) throw new Error('clientId required')

  const totalPending = (await Contract.findAll({
    where: { ClientId: clientId },
    include: [
      {
        model: Job.scope('unpaid'),
        attributes: [],
      },
    ],
    raw: true,
    attributes: [[sequelize.fn('sum', sequelize.col('price')), 'total']],
    transaction,
  })) as unknown as { total: number }[]

  if (!totalPending || !totalPending[0]) return 0

  const [{ total }] = totalPending
  return total
}
