const cartsDao = require('../dao/carts-dao');
const ServerError = require('../errors/server-error');
const ErrorType = require("../errors/error-type");
const userCache = require('../models/UserDataCache');
const extractUserDataFromCache = require('../models/ExtractUserDataFromCache');



const addProductToCart = async (request, newProductData) => {

    let userCacheData = extractUserDataFromCache(request);
    let userId = userCacheData.userId
    let userType = userCacheData.userType;
    let isCartOpen = await cartsDao.isCartOpen(userId);
    if (isCartOpen) {
        if (userType === "USER") {
            let isProductExistInCart = await cartsDao.isProductExistInCart(newProductData, userId);
            await cartsDao.addProductToCart(isProductExistInCart, newProductData, userId);

        } else {
            throw new ServerError(ErrorType.USER_IS_NOT_AUTHORIZED);
        }

    } else {
        if (userType === "USER") {
            let date = new Date();
            date = date.getUTCFullYear() + '-' +
                ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
                ('00' + date.getUTCDate()).slice(-2);
            await cartsDao.openCart(userId, date);
            let isProductExistInCart = await cartsDao.isProductExistInCart(newProductData, userId);
            await cartsDao.addProductToCart(isProductExistInCart, newProductData, userId);

        } else {
            throw new ServerError(ErrorType.USER_IS_NOT_AUTHORIZED);
        }
    }
}



const getAllCartItems = async (request) => {

    let userCacheData = extractUserDataFromCache(request);
    let id = userCacheData.userId
    let allCartItems = await cartsDao.getAllCartItems(id);
    if (allCartItems[0].productId === null) {
        return [];
    }
    return allCartItems;
}


const deleteItem = async (request, productId) => {

    let userCacheData = extractUserDataFromCache(request);
    let userType = userCacheData.userType;
    let id = userCacheData.userId

    // let imageToDeleteFromServer = request.body.imageToDeleteFromServer;
    // console.log(imageToDeleteFromServer);
    // const imageFileName = imageToDeleteFromServer.split('/')[3];

    if (userType === "USER") {

        await cartsDao.deleteProduct(productId, id);

        // fs.unlinkSync('./uploads/' + imageFileName);
    } else {
        throw new ServerError(ErrorType.USER_IS_NOT_AUTHORIZED);
    }
}

const deleteAllItems = async (request) => {
    let userCacheData = extractUserDataFromCache(request);
    let userType = userCacheData.userType;
    let id = userCacheData.userId
    // let imageToDeleteFromServer = request.body.imageToDeleteFromServer;
    // console.log(imageToDeleteFromServer);
    // const imageFileName = imageToDeleteFromServer.split('/')[3];

    if (userType === "USER") {

        await cartsDao.deleteAllItems(id);

        // fs.unlinkSync('./uploads/' + imageFileName);
    } else {
        throw new ServerError(ErrorType.USER_IS_NOT_AUTHORIZED);
    }
}


module.exports = {
    addProductToCart,
    getAllCartItems,
    deleteItem,
    deleteAllItems
};