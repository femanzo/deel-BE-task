"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserNonTerminantedContracts = exports.getProfileContractById = exports.getJobById = exports.getProfileById = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
const utils_1 = require("../utils");
const { models: { Profile, Contract, Job }, } = db_1.sequelize;
/**
 * Get a profile by id
 * @param {number} profileId
 * @param {Sequelize.Transaction?} transaction - The transaction to use
 * @returns {Promise<Profile>}
 * @throws {Error} - If profile is not found
 */
const getProfileById = async (profileId, transaction = null) => {
    if (!profileId) {
        throw new utils_1.ApiError('profileId is required', 400);
    }
    const profile = await Profile.findByPk(profileId, { transaction });
    (0, utils_1.assertRecordFound)(profile, 'Profile', profileId);
    return profile;
};
exports.getProfileById = getProfileById;
/**
 * Get a job by id
 * @param {number} jobId
 * @param {number} clientId
 * @param {Sequelize.Transaction} transaction - The transaction to use
 * @returns {Promise<Job>}
 * @throws {Error} - If job is not found
 */
const getJobById = async (jobId, clientId, transaction = null) => {
    if (!jobId)
        throw new Error('jobId is required');
    const job = await Job.findByPk(jobId, {
        where: { ClientId: clientId },
        transaction,
    });
    (0, utils_1.assertRecordFound)(job, 'Job', jobId);
    return job;
};
exports.getJobById = getJobById;
/**
 * Get a contract by id that belongs to the client
 * @param {number} profileId - The id from ether the client or the contractor profile
 * @param {number} contractId - The contract Id
 * @param {Sequelize.Transaction} transaction - The transaction to use
 * @returns {Promise<Contract>} - The contract
 * @throws {Error} - If contract is not found
 */
const getProfileContractById = async (profileId, contractId, transaction = null) => {
    if (!profileId)
        throw new Error('profileId is required');
    if (!contractId)
        throw new Error('contractId is required');
    const contract = await Contract.findOne({
        where: {
            id: contractId,
            [sequelize_1.Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
        },
        include: ['Client', 'Contractor'],
        transaction,
    });
    (0, utils_1.assertRecordFound)(contract, 'Contract', contractId);
    return contract;
};
exports.getProfileContractById = getProfileContractById;
/**
 * Get all the non-terminated contracts that belong to the profile
 * @param {number} profileId - The id from ether the client or the contractor profile
 * @returns {Promise<Contract[]>} - The contracts that belong to the profile
 */
const getUserNonTerminantedContracts = async (profileId) => {
    const contracts = await Contract.scope('pending').findAll({
        where: {
            [sequelize_1.Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
        },
        attributes: {
            exclude: ['ClientId', 'ContractorId'],
        },
        include: ['Client', 'Contractor'],
    });
    return contracts;
};
exports.getUserNonTerminantedContracts = getUserNonTerminantedContracts;
