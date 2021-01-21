const cartsDao = require('../dao/carts-dao');
const ServerError = require('../errors/server-error');
const ErrorType = require("../errors/error-type");
const userCache = require('../models/UserDataCache');
const extractUserDataFromCache = require('../models/ExtractUserDataFromCache');



const addProductToCart = async (request, newProductData) => {

    let userCacheData = extractUserDataFromCache(request);
    let userId = userCacheData.userId
    let userType = userCacheData.userType;
    if (userType === "USER") {
        let isProductExist = await cartsDao.isProductExist(newProductData, userId);
        await cartsDao.addProductToCart(isProductExist, newProductData, userId);

    } else {
        throw new ServerError(ErrorType.USER_IS_NOT_AUTHORIZED);
    }
}



const getAllCartItems = async (request) => {


    let userCacheData = extractUserDataFromCache(request);
    let id = userCacheData.userId
    let allCartItems = await cartsDao.getAllCartItems(id);


    return allCartItems;
}


const deleteItem = async (request, productId) => {

    let userCacheData = extractUserDataFromCache(request);
    let userType = userCacheData.userType;
    // let imageToDeleteFromServer = request.body.imageToDeleteFromServer;
    // console.log(imageToDeleteFromServer);
    // const imageFileName = imageToDeleteFromServer.split('/')[3];

    if (userType === "USER") {

        await cartsDao.deleteProduct(productId);

        // fs.unlinkSync('./uploads/' + imageFileName);
    } else {
        throw new ServerError(ErrorType.USER_IS_NOT_AUTHORIZED);
    }
}



module.exports = {
    addProductToCart,
    getAllCartItems,
    deleteItem
};