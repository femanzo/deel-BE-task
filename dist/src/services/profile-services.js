"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalOfJobsToPay = exports.transferFunds = exports.removeFromBalance = exports.addToBalance = exports.depositFunds = void 0;
const db_1 = require("../db");
const utils_1 = require("../utils");
const db_services_1 = require("./db-services");
const { models: { Contract, Job }, } = db_1.sequelize;
/**
 * Deposit funds to a client's profile
 * @param {number} userId
 * @param {number} amount
 * @returns {Promise<{profile: Profile, totalPendingAmount: number}>}
 * @throws {Error} - If userId is not provided
 * @throws {Error} - If amount is invalid
 * @throws {Error} - If the deposit amount is greater than the max amount
 */
const depositFunds = async (userId, amount) => {
    if (!userId || !amount)
        throw new Error('Invalid parameters');
    try {
        const updatedProfile = await db_1.sequelize.transaction(async (t) => {
            const totalPendingAmount = await (0, exports.getTotalOfJobsToPay)(userId, t);
            const profile = await (0, db_services_1.getProfileById)(userId, t);
            const updatedBalance = (0, utils_1.safeAdd)(profile.balance, amount);
            const maxAmount = (0, utils_1.safeMultiply)(totalPendingAmount, 1.25);
            if (updatedBalance > maxAmount) {
                const maxDepositAmount = (0, utils_1.safeSubtract)(maxAmount, profile.balance);
                let maxDepositErrorMsg = `You cannot deposit more than $${maxDepositAmount}`;
                if (maxDepositAmount <= 0) {
                    maxDepositErrorMsg = `You have reached the deposit limit`;
                }
                throw new utils_1.ApiError(maxDepositErrorMsg, 400);
            }
            const { balance } = await (0, exports.addToBalance)(userId, amount, t);
            return { message: `$${amount} deposited successfully, your new balance is ${balance}` };
        });
        return updatedProfile;
    }
    catch (err) {
        throw err;
    }
};
exports.depositFunds = depositFunds;
/**
 * Add funds to a profile's balance
 * @param {number} profileId
 * @param {number} amount
 * @param {Sequelize.Transaction} transaction
 * @returns {Promise<Profile>}
 */
const addToBalance = async (profileId, amount, transaction = null) => {
    if (!profileId)
        throw new Error('profileId required');
    if (!amount || amount < 0)
        throw new Error('invalid amount');
    const profile = await (0, db_services_1.getProfileById)(profileId, transaction);
    profile.balance = (0, utils_1.safeAdd)(profile.balance, amount);
    await profile.save({ transaction });
    return profile;
};
exports.addToBalance = addToBalance;
/**
 * Remove funds from a profile's balance
 * @param {number} profileId
 * @param {number} amount
 * @param {Sequelize.Transaction} transaction
 * @returns {Promise<Profile>}
 */
const removeFromBalance = async (profileId, amount, transaction = null) => {
    if (!profileId)
        throw new Error('profileId required');
    if (!amount || amount < 0)
        throw new Error('invalid amount');
    const profile = await (0, db_services_1.getProfileById)(profileId, transaction);
    profile.balance = (0, utils_1.safeSubtract)(profile.balance, amount);
    if (profile.balance < 0)
        throw new utils_1.ApiError('Insufficient funds', 400);
    await profile.save({ transaction });
    return profile;
};
exports.removeFromBalance = removeFromBalance;
/**
 * transfer funds from a profile's to another
 * @param {number} fromProfileId
 * @param {number} toProfileId
 * @param {number} amount
 * @param {Sequelize.Transaction} transaction
 */
const transferFunds = async (fromProfileId, toProfileId, amount, transaction) => {
    if (!fromProfileId)
        throw new Error('fromProfileId required');
    if (!toProfileId)
        throw new Error('toProfileId required');
    if (!amount || amount < 0)
        throw new Error('invalid amount');
    if (!transaction)
        throw new Error('transaction required');
    await (0, exports.removeFromBalance)(fromProfileId, amount, transaction);
    await (0, exports.addToBalance)(toProfileId, amount, transaction);
};
exports.transferFunds = transferFunds;
/**
 * Return the total amount of jobs to pay for a user
 * @param {number} clientId
 * @param {transaction} seequelize transaction
 * @returns {Promise<number>} - The total amount
 */
const getTotalOfJobsToPay = async (clientId, transaction = null) => {
    if (!clientId)
        throw new Error('clientId required');
    const [{ total }] = await Contract.findAll({
        where: { ClientId: clientId },
        include: [
            {
                model: Job.scope('unpaid'),
                attributes: [],
            },
        ],
        raw: true,
        attributes: [[db_1.sequelize.fn('sum', db_1.sequelize.col('price')), 'total']],
        transaction,
    });
    return total || 0;
};
exports.getTotalOfJobsToPay = getTotalOfJobsToPay;
