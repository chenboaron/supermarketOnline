const ordersDao = require('../dao/orders-dao');
const ServerError = require('../errors/server-error');
const ErrorType = require("../errors/error-type");
const userCache = require('../models/UserDataCache');
const extractUserDataFromCache = require('../models/ExtractUserDataFromCache');



const order = async (request,newOrder) => {

    let userCacheData = extractUserDataFromCache(request);
    let userId = userCacheData.userId
    let userType = userCacheData.userType;
    if (userType === "USER") {
        await ordersDao.order(newOrder, userId);
        await ordersDao.deleteAllItemFromCart(newOrder, userId);
    } else {
        throw new ServerError(ErrorType.USER_IS_NOT_AUTHORIZED);
    }


}



module.exports = {
    order

}