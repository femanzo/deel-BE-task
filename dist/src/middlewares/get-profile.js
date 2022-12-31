"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const services_1 = require("../services");
const { getProfileById } = services_1.dbServices;
/*
 * Check for valid profile_id in header
 * Add a profile to the request object if it exists
 * Here we could validate a JWT token on a real world scenario
 */
exports.default = async (req, res, next) => {
    const { profile_id } = req.headers;
    if (!profile_id) {
        const missingProfileIdError = new utils_1.ApiError('Missing profile_id header', 401);
        return next(missingProfileIdError);
    }
    try {
        const profile = await getProfileById(profile_id);
        if (!profile) {
            const profileNotFoundError = new utils_1.ApiError(`Profile with id ${profile_id} could not be found`, 401);
            return next(profileNotFoundError);
        }
        /**
         * Now the user is authenticated,
         * we add the profile to the req object
         * so we can use it later
         */
        req.profile = profile;
        return next();
    }
    catch (err) {
        return next(err);
    }
};
