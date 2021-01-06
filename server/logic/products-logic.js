const productsDao = require('../dao/products-dao');
const ServerError = require('../errors/server-error');
const ErrorType = require("../errors/error-type");
const userCache = require('../models/UserDataCache');
const extractUserDataFromCache = require('../models/ExtractUserDataFromCache');
const download = require('image-downloader');
const fs = require('fs');


// -------------- Vacation's Server Validations - In Case Someone Tries To Skip The UI Validations -------------- //

const isProductValid = (newVacationData) => {

    const startDate = newProductData.startDate;
    const endDate = newProductData.endDate;

    const isProductNameValid = validateProductName(newProductData.productName.trim());
    const isProductImageURLValid = validateProductImageURL(newProductData.imageURL.trim());
    const isProductDescrptionValid = validateProductDescription(newProductData.productDescription.trim());
    const areProductDatesValid = validateProductDates(startDate, endDate);
    const isProductPriceValid = validateProductPrice(newProductData.ProductPrice);

    if (isProductNameValid) {
        if (isProductPriceValid) {
            if (isProductDescrptionValid) {
                if (areProductDatesValid) {
                    if (isProductImageURLValid) {

                        return true;
                    }
                }

            }
        }
    }

    return false;
}

const validateVacationName = (trimmedVacationName) => {

    if (trimmedVacationName != "") {
        if (trimmedVacationName.length >= 3) {
            if (trimmedVacationName.length <= 44) {
                return true;
            }
        }
    }

    return false;
}

const validateVacationImageURL = (trimmedVacationImageURL) => {

    if (trimmedVacationImageURL !== "") {
        if (trimmedVacationImageURL.length >= 10) {
            if (trimmedVacationImageURL.length <= 998) {
                return true;
            }
        }
    }

    return false;
}

const validateVacationDescription = (trimmedVacationDescription) => {

    if (trimmedVacationDescription !== "") {
        if (trimmedVacationDescription.length >= 5) {
            if (trimmedVacationDescription.length <= 249) {
                return true;
            }
        }
    }

    return false;
}

const validateVacationDates = (newVacationStartDate, newVacationEndDate) => {
    if (newVacationStartDate !== "") {
        if (newVacationStartDate !== undefined) {

            if (newVacationEndDate !== "") {
                if (newVacationEndDate !== undefined) {

                    let currentDate = new Date().setHours(0, 0, 0, 0);
                    let startDate = new Date(newVacationStartDate).setHours(0, 0, 0, 0);
                    let endDate = new Date(newVacationEndDate).setHours(0, 0, 0, 0);

                    // Checking if the starting date is not in the past
                    if (startDate >= currentDate) {

                        // Checking if the ending date is greater than the starting date
                        if (endDate > startDate) {
                            return true;
                        }

                        else {
                            return false;
                        }
                    }

                    else {
                        return false;
                    }
                }
            }
        }
    }

    return false;
}

const validateVacationPrice = (vacationPrice) => {
    if (vacationPrice > 0) {
        if (vacationPrice < 100000) {
            return true;
        }
    }

    return false;
}


// -------------- Vacation's Server Logic Functions -------------- //

const getAllProducts = async () => {

    // Retrieving all the vacations from the DAO preset

    let allProducts = await productsDao.getAllProducts();
    for (let product of allProducts) {
        product.imageURL = 'http://localhost:3001/' + product.imageURL;
    }
    return allProducts;
}


const addProduct = async (request, newVacationData) => {

    let userCacheData = extractUserDataFromCache(request);
    let userType = userCacheData.userType;

    // Checking the server's cache if the user's type is an admin
    if (userType === "ADMIN") {
        
        const imageName = Date.parse(new Date()) + '.jpg';
        const imageURL = newProductData.imageURL;

        const options = {
            url: imageURL,
            dest: './uploads/' + imageName
        }

        if (isProductValid(newProductData)) {

            newProductData.imageURL = imageName;
            let newlyAddedProduct = await productDao.addProduct(newProductData);
    
            await download.image(options).then(() => {
              console.log('Image Saved Locally!');
            })
            .catch(() => {
                throw new ServerError(ErrorType.BAD_IMAGE);
            });
    
            newlyAddedProduct[0].imageURL = `http://localhost:3001/${imageName}`;
            return newlyAddedProduct;
        }else {
            throw new ServerError(ErrorType.ACTION_NOT_ALLOWED);
        }
    }else {
        throw new ServerError(ErrorType.USER_IS_NOT_AUTHORIZED);
    }
}

const deleteProduct = async (request, productID) => {

    let userCacheData = extractUserDataFromCache(request);
    let userType = userCacheData.userType;
    let imageToDeleteFromServer = request.body.imageToDeleteFromServer;
    console.log(imageToDeleteFromServer);
    const imageFileName = imageToDeleteFromServer.split('/')[3];
    
    if (userType === "ADMIN") {

        await productsDao.deleteProduct(productID);

        fs.unlinkSync('./uploads/' + imageFileName);
    }else {
        throw new ServerError(ErrorType.USER_IS_NOT_AUTHORIZED);
    }
}

const updateProduct = async (request, ProductID, newProductData) => {

    let userCacheData = extractUserDataFromCache(request);
    let userType = userCacheData.userType;
    
    if (userType === "ADMIN") {
        
        const imageName = Date.parse(new Date()) + '.jpg';
        const imageURL = newProductData.imageURL;
        const imageToDeleteFromServer = request.body.imageToDeleteFromServer;
        const imageFileName = imageToDeleteFromServer.split('/')[3];
        newProductData.imageURL = imageName;

        if (isProductValid(newProductData)) {

            const options = {
                url: imageURL,
                dest: './uploads/' + imageName
            }

            await productsDao.updateProduct(productID, newProductData);
    
            await download.image(options).then(() => {
                
                fs.unlinkSync('./uploads/' + imageFileName);
    
                console.log('Image Updated!');
            })
            .catch(() => {
                throw new ServerError(ErrorType.BAD_IMAGE);
            });

            return "http://localhost:3001/" + imageName;
        }
    }else {
        throw new ServerError(ErrorType.USER_IS_NOT_AUTHORIZED);
    }
}


module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct
};