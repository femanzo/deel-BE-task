"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payJobRequest = exports.getUserUnpaidJobsRequest = void 0;
const services_1 = require("../services");
const { getUserUnpaidJobs, payJob } = services_1.jobServices;
const getUserUnpaidJobsRequest = async (req, res, next) => {
    const { id: profileId } = req.profile;
    try {
        const jobs = await getUserUnpaidJobs(Number(profileId));
        return res.json(jobs);
    }
    catch (err) {
        return next(err);
    }
};
exports.getUserUnpaidJobsRequest = getUserUnpaidJobsRequest;
const payJobRequest = async (req, res, next) => {
    const { id: profileId } = req.profile;
    const { job_id: jobId } = req.params;
    try {
        const paidJob = await payJob(profileId, Number(jobId));
        return res.json(paidJob);
    }
    catch (err) {
        return next(err);
    }
};
exports.payJobRequest = payJobRequest;
