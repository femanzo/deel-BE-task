"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserNonTerminantedContractsRequest = exports.getProfileContractByIdRequest = void 0;
const services_1 = require("../services");
const { getProfileContractById, getUserNonTerminantedContracts } = services_1.dbServices;
const getProfileContractByIdRequest = async (req, res, next) => {
    const { id: contractId } = req.params;
    const { id: profileId } = req.profile;
    try {
        const contracts = await getProfileContractById(Number(profileId), Number(contractId));
        return res.json(contracts);
    }
    catch (err) {
        return next(err);
    }
};
exports.getProfileContractByIdRequest = getProfileContractByIdRequest;
const getUserNonTerminantedContractsRequest = async (req, res, next) => {
    const { id: profileId } = req.profile;
    try {
        const contracts = await getUserNonTerminantedContracts(Number(profileId));
        return res.json(contracts);
    }
    catch (err) {
        return next(err);
    }
};
exports.getUserNonTerminantedContractsRequest = getUserNonTerminantedContractsRequest;
