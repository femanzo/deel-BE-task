const { Op } = require('sequelize')

const { sequelize } = require('../db')
const { isValidTimeRange } = require('../utils')

const {
  models: { Contract, Job, Profile },
} = sequelize

/**
 * Get a list of the top paying clients
 * @param {Date} startDate
 * @param {Date} endDate
 * @param {number} limit
 * @returns {Promise<Profile[]>}
 */
const getBestClients = async (startDate, endDate, limit = 2) => {
  if (!isValidTimeRange(startDate, endDate)) {
    const invalidTimeRangeError = new Error(`Invalid time range`)
    invalidTimeRangeError.statusCode = 400
    throw invalidTimeRangeError
  }

  // prevents wrong limit values from crashing the server
  if (Number.isNaN(Number(limit))) limit = 2

  const clientPayments = await Profile.findAll({
    attributes: [
      'id',
      [sequelize.literal(`Profile.firstName || ' ' || Profile.lastName`), 'fullName'],
      [sequelize.fn('sum', sequelize.col('price')), 'paid'],
    ],
    limit,
    include: [
      {
        model: Contract,
        as: 'Client',
        attributes: [],
        required: true,
        include: [
          {
            model: Job.scope('paid'),
            attributes: [],
            where: {
              paymentDate: {
                [Op.not]: null,
                [Op.gte]: startDate,
                [Op.lte]: endDate,
              },
            },
          },
        ],
      },
    ],
    group: ['Profile.id'],
    order: [[sequelize.col('paid'), 'DESC']],
    /*
     * subQuery is not documented in sequelize docs
     * https://stackoverflow.com/questions/42439183/sequelize-associations-causing-sub-query
     */
    subQuery: false,
  })

  if (clientPayments.length === 0) {
    const noJobsPaidError = new Error(`No jobs were paid in the specified time range`)
    noJobsPaidError.statusCode = 404
    throw noJobsPaidError
  }

  return clientPayments
}

/**
 * Returns the profession that earned the most money (sum of jobs paid)
 * for any contractor that worked in the query time range.
 * @param {Date} startDate
 * @param {Date} endDate
 * @returns {object} { profession: string, totalEarnings: number }
 */
const getBestProfession = async (startDate, endDate) => {
  if (!isValidTimeRange(startDate, endDate)) {
    const invalidTimeRangeError = new Error(`Invalid time range`)
    invalidTimeRangeError.statusCode = 400
    throw invalidTimeRangeError
  }

  const profileEarnings = await Profile.findAll({
    include: [
      {
        attributes: [],
        model: Contract,
        as: 'Contractor',
        include: [
          {
            attributes: [],
            model: Job.scope('paid'),
            where: {
              paymentDate: {
                [Op.not]: null,
                [Op.gte]: startDate,
                [Op.lte]: endDate,
              },
            },
          },
        ],
        required: true,
      },
    ],
    group: ['profession'],
    order: [[sequelize.literal('totalEarnings'), 'DESC']],
    attributes: ['profession', [sequelize.fn('sum', sequelize.col('price')), 'totalEarnings']],
  })

  const [highestEarningProfession] = profileEarnings

  if (!highestEarningProfession) {
    const noProfessionFoundError = new Error(`Not enough data to calculate the best profession.`)
    noProfessionFoundError.statusCode = 404
    throw noProfessionFoundError
  }

  return highestEarningProfession
}

module.exports = {
  getBestClients,
  getBestProfession,
}
