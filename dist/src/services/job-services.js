"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserUnpaidJobs = exports.payJob = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
const utils_1 = require("../utils");
const db_services_1 = require("./db-services");
const profile_services_1 = require("./profile-services");
const { models: { Job, Contract }, } = db_1.sequelize;
/**
 * Pay for a job, a client can only pay if his balance >= the amount to pay.
 * The amount should be moved from the client's balance to the contractor balance.
 * @param {number} clientId - The id of the client
 * @param {number} jobId - The id of the job
 * @returns {Promise<{job: Job, client: Profile, contractor: Profile}>}
 */
const payJob = async (clientId, jobId) => {
    try {
        const result = await db_1.sequelize.transaction(async (t) => {
            const job = await (0, db_services_1.getJobById)(jobId, clientId, t);
            const contract = await (0, db_services_1.getProfileContractById)(clientId, job.ContractId, t).catch((err) => {
                /*
                 fix for possible security issue,
                 this would leak the existence of a contract and its id
                 */
                throw new utils_1.ApiError('Contract not found', 404);
            });
            // paid is not null, false, 0 or undefined
            if (job.paid) {
                throw new utils_1.ApiError(`Job #${jobId} was already paid`, 409);
            }
            await (0, profile_services_1.transferFunds)(contract.ClientId, contract.ContractorId, job.price, t);
            job.paid = true;
            job.paymentDate = new Date();
            await job.save({ transaction: t });
            return job;
        });
        return result;
    }
    catch (error) {
        throw error;
    }
};
exports.payJob = payJob;
/**
 * Get all unpaid jobs for a user (either a client or contractor), for active contracts only.
 * @param {number} profileId - The id from either the client or the contractor profile
 * @returns {Promise<Job[]>} - The jobs
 */
const getUserUnpaidJobs = async (profileId) => {
    const jobs = await Job.scope('unpaid').findAll({
        include: {
            model: Contract.scope('active'),
            where: {
                [sequelize_1.Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
            },
        },
    });
    return jobs;
};
exports.getUserUnpaidJobs = getUserUnpaidJobs;
