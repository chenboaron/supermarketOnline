const ordersDao = require('../dao/orders-dao');
const cartsDao = require('../dao/carts-dao');
const ServerError = require('../errors/server-error');
const ErrorType = require("../errors/error-type");
const userCache = require('../models/UserDataCache');
const extractUserDataFromCache = require('../models/ExtractUserDataFromCache');






const order = async (request,newOrder) => {

    let userCacheData = extractUserDataFromCache(request);
    let userId = userCacheData.userId
    let userType = userCacheData.userType;
    if (userType === "USER") {
        let date = new Date();
        date  = date.getUTCFullYear() + '-' +
            ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
            ('00' + date.getUTCDate()).slice(-2);

        let orderDetails={
            userId: userId,
            city: newOrder.city,
            street: newOrder.street,
            deliveryDate: newOrder.date,
            orderDate: date,
            lastFourCardDigits: newOrder.creditCard.substring(newOrder.creditCard.length-4),
        }
        await ordersDao.order(orderDetails);
        await ordersDao.closeCart(orderDetails.userId);

    } else {
        throw new ServerError(ErrorType.USER_IS_NOT_AUTHORIZED);
    }


}



module.exports = {
    order

}