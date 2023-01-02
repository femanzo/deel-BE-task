"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBestProfession = exports.getBestClients = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
const utils_1 = require("../utils");
const { models: { Contract, Job, Profile }, } = db_1.sequelize;
/**
 * Get a list of the top paying clients
 * @param {Date} startDate
 * @param {Date} endDate
 * @param {number} limit
 * @returns {Promise<Profile[]>}
 */
const getBestClients = async (startDate, endDate, limit = 2) => {
    if (!(0, utils_1.isValidTimeRange)(startDate, endDate)) {
        throw new utils_1.ApiError(`Invalid time range`, 400);
    }
    // prevents wrong limit values from crashing the server
    if (Number.isNaN(Number(limit)))
        limit = 2;
    const clientPayments = await Profile.findAll({
        attributes: [
            'id',
            [db_1.sequelize.literal(`Profile.firstName || ' ' || Profile.lastName`), 'fullName'],
            [db_1.sequelize.fn('sum', db_1.sequelize.col('price')), 'paid'],
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
                                [sequelize_1.Op.not]: null,
                                [sequelize_1.Op.gte]: startDate,
                                [sequelize_1.Op.lte]: endDate,
                            },
                        },
                    },
                ],
            },
        ],
        group: ['Profile.id'],
        order: [[db_1.sequelize.col('paid'), 'DESC']],
        /*
         * subQuery is not documented in sequelize docs
         * https://stackoverflow.com/questions/42439183/sequelize-associations-causing-sub-query
         */
        subQuery: false,
    });
    if (clientPayments.length === 0) {
        throw new utils_1.ApiError(`No jobs were paid in the specified time range`, 404);
    }
    return clientPayments;
};
exports.getBestClients = getBestClients;
/**
 * Returns the profession that earned the most money (sum of jobs paid)
 * for any contractor that worked in the query time range.
 * @param {Date} startDate
 * @param {Date} endDate
 * @returns {object} { profession: string, totalEarnings: number }
 */
const getBestProfession = async (startDate, endDate) => {
    if (!(0, utils_1.isValidTimeRange)(startDate, endDate)) {
        throw new utils_1.ApiError(`Invalid time range`, 400);
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
                                [sequelize_1.Op.not]: null,
                                [sequelize_1.Op.gte]: startDate,
                                [sequelize_1.Op.lte]: endDate,
                            },
                        },
                    },
                ],
                required: true,
            },
        ],
        group: ['profession'],
        attributes: ['profession', [db_1.sequelize.fn('sum', db_1.sequelize.col('price')), 'totalEarnings']],
        order: [[db_1.sequelize.literal('totalEarnings'), 'DESC']],
    });
    const [profession] = profileEarnings;
    if (!profession) {
        throw new utils_1.ApiError(`Not enough data to calculate the best profession.`, 404);
    }
    return {
        profession: profession.dataValues.profession,
        totalEarnings: profession.dataValues.totalEarnings,
    };
};
exports.getBestProfession = getBestProfession;
