"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserNonTerminantedContracts = exports.getProfileContractById = exports.getJobById = exports.getProfileById = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
const utils_1 = require("../utils");
/**
 * Get a profile by id
 * @param {number} profileId
 * @param {Sequelize.Transaction?} transaction - The transaction to use
 * @returns {Promise<Profile>}
 * @throws {Error} - If profile is not found
 */
const getProfileById = async (profileId, transaction = null) => {
    if (!profileId)
        throw new Error('profileId is required');
    const profile = await models_1.Profile.findByPk(profileId, { transaction });
    (0, utils_1.assertRecordFound)(profile, 'Profile', profileId);
    return profile;
};
exports.getProfileById = getProfileById;
/**
 * Get a job by id
 * @param {number} jobId
 * @param {Sequelize.Transaction} transaction - The transaction to use
 * @returns {Promise<Job>}
 * @throws {Error} - If job is not found
 */
const getJobById = async (jobId, transaction = null) => {
    if (!jobId)
        throw new Error('jobId is required');
    const job = await models_1.Job.findByPk(jobId, { transaction, include: ['contract'] });
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
    const contract = await models_1.Contract.findOne({
        where: {
            id: contractId,
            [sequelize_1.Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
        },
        include: ['client', 'contractor', 'jobs'],
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
    const contracts = await models_1.Contract.scope('pending').findAll({
        where: {
            [sequelize_1.Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
        },
        include: ['client', 'contractor', 'jobs'],
    });
    return contracts;
};
exports.getUserNonTerminantedContracts = getUserNonTerminantedContracts;
