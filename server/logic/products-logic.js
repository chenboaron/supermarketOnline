const productsDao = require('../dao/products-dao');
const ServerError = require('../errors/server-error');
const ErrorType = require("../errors/error-type");
const userCache = require('../models/UserDataCache');
const extractUserDataFromCache = require('../models/ExtractUserDataFromCache');
const download = require('image-downloader');
const fs = require('fs');



const isProductValid = (newProductData) => {

    const isProductNameValid = validateProductName(newProductData.productName.trim());
    const isProductImageURLValid = validateProductImageURL(newProductData.imageURL.trim());
    const isProductCategoryValid = validateProductCategory(newProductData.productCategory.trim());
    const isProductPriceValid = validateProductPrice(newProductData.productPrice);

    if (isProductNameValid) {
        if (isProductPriceValid) {
            if (isProductCategoryValid) {
                if (isProductImageURLValid) {
                    return true;
                }
            }
        }
    }

    return false;
}

const validateProductName = (trimmedProductName) => {
    if (trimmedProductName != "") {
        if (trimmedProductName.length >= 3) {
            if (trimmedProductName.length <= 44) {
                return true;
            }
        }
    }

    return false;
}

const validateProductImageURL = (trimmedProductImageURL) => {
    if (trimmedProductImageURL !== "") {
        if (trimmedProductImageURL.length >= 10) {
            if (trimmedProductImageURL.length <= 998) {
                return true;
            }
        }
    }

    return false;
}

const validateProductCategory = (trimmedProductCategory) => {
    if (trimmedProductCategory !== "") {
        if (trimmedProductCategory.length >= 1) {
            if (trimmedProductCategory.length <= 249) {
                return true;
            }
        }
    }

    return false;
}

const validateProductPrice = (productPrice) => {
    if (productPrice > 0) {
        if (productPrice < 100000) {
            return true;
        }
    }

    return false;
}



const getAllProducts = async () => {

    let allProducts = await productsDao.getAllProducts();
    // for (let product of allProducts) {
    //     product.imageURL = 'http://localhost:3001/' + product.imageURL;
    // }
    return allProducts;
}


const addOrEditProduct = async (request, newProductData) => {
    let userCacheData = extractUserDataFromCache(request);
    let userType = userCacheData.userType;

    if (userType === "ADMIN") {

        // const imageName = Date.parse(new Date()) + '.jpg';
        // const imageURL = newProductData.imageURL;

        // const options = {
        //     url: imageURL,
        //     dest: './uploads/' + imageName
        // }
        if (isProductValid(newProductData)) {
            let isProductExist= await productsDao.isProductExist(newProductData.productId)
            if (isProductExist) {
                await productsDao.updateProduct(newProductData);
            } else {
                  let id =await productsDao.addProduct(newProductData);
                  return id;

            }
            // newProductData.imageURL = imageName;

            // await download.image(options).then(() => {
            //     console.log('Image Saved Locally!');
            // })
            //     .catch(() => {
            //         throw new ServerError(ErrorType.BAD_IMAGE);
            //     });

            // newlyAddedProduct[0].imageURL = `http://localhost:3001/${imageName}`;
        } else {
            throw new ServerError(ErrorType.ACTION_NOT_ALLOWED);
        }
    } else {
        throw new ServerError(ErrorType.USER_IS_NOT_AUTHORIZED);
    }
}




module.exports = {
    getAllProducts,
    addOrEditProduct
};