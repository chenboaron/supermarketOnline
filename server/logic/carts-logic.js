const cartsDao = require('../dao/carts-dao');
const ServerError = require('../errors/server-error');
const ErrorType = require("../errors/error-type");
const userCache = require('../models/UserDataCache');
const extractUserDataFromCache = require('../models/ExtractUserDataFromCache');



const addProductToCart = async (request, newProductData) => {

    let userCacheData = extractUserDataFromCache(request);
    let userType = userCacheData.userType;

    if (userType === "USER") {
        let isProductExist = await cartsDao.isProductExist(newProductData);
        await cartsDao.addProductToCart(isProductExist, newProductData);

    } else {
        throw new ServerError(ErrorType.USER_IS_NOT_AUTHORIZED);
    }
}



module.exports = {
    addProductToCart
};