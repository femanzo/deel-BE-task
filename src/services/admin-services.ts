import { Op } from 'sequelize'

import { sequelize } from '../db'
import { isValidTimeRange, ApiError } from '../utils'

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
export const getBestClients = async (startDate: Date, endDate: Date, limit = 2) => {
  if (!isValidTimeRange(startDate, endDate)) {
    throw new ApiError(`Invalid time range`, 400)
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
    throw new ApiError(`No jobs were paid in the specified time range`, 404)
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
export const getBestProfession = async (startDate: Date, endDate: Date) => {
  if (!isValidTimeRange(startDate, endDate)) {
    throw new ApiError(`Invalid time range`, 400)
  }

  const profileEarnings = await Profile.findAll({
    include: [
      {
        model: Contract,
        as: 'Contractor',
        include: [
          {
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
    attributes: ['profession', [sequelize.fn('sum', sequelize.col('price')), 'totalEarnings']],
    order: [[sequelize.literal('totalEarnings'), 'DESC']],
  })

  const [profession] = profileEarnings

  if (!profession) {
    throw new ApiError(`Not enough data to calculate the best profession.`, 404)
  }

  return {
    profession: profession.dataValues.profession,
    totalEarnings: profession.dataValues.totalEarnings,
  }
}
