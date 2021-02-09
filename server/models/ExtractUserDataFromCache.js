const ErrorType = require('../errors/error-type');
const ServerError = require('../errors/server-error');
const userCache = require('../models/UserDataCache');

const extractUserDataFromCache = (request) => {

    let authorizationString = request.headers['authorization'];
    let token = authorizationString.substring("Bearer ".length);
    let userCacheData = userCache.get(token);
    if (userCacheData === undefined) {
        throw new ServerError(ErrorType.USER_IS_NO_LONGER_LOGGED_IN);
    }

    return userCacheData;
}

module.exports = extractUserDataFromCache;