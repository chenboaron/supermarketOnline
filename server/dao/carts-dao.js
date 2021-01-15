let connection = require("./connection-wrapper");
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");



const addProductToCart = async (isProductExist, newProductData) => {
    if (isProductExist) {
        const SQLUpdateQuery = "UPDATE `cart-items` SET amount=? , total_price=(SELECT product_price  FROM products  WHERE product_id = ?)*?  WHERE product_id=? And cart_id =?";
        const parametersOfUpdate = [newProductData.amountOfProduct, newProductData.productId, newProductData.amountOfProduct, newProductData.productId, newProductData.cartId];

        try {
            await connection.executeWithParameters(SQLUpdateQuery, parametersOfUpdate);

        } catch (error) {
            throw new ServerError(ErrorType.GENERAL_ERROR);
        }

    } else {
        const SQLInsertQuery = "INSERT INTO `cart-items` (product_id, amount, cart_id, total_price) VALUES (?,?,?,(SELECT product_price  FROM products  WHERE product_id = ?)*?)";

        const parameters = [newProductData.productId, newProductData.amountOfProduct, newProductData.cartId, newProductData.productId, newProductData.amountOfProduct];

        try {
            await connection.executeWithParameters(SQLInsertQuery, parameters);

        } catch (error) {
            throw new ServerError(ErrorType.GENERAL_ERROR);
        }
    }
}


const isProductExist = async (product) => {
    const SQL = "SELECT product_id FROM `cart-items` WHERE product_id=? And cart_id =?  ";
    const parameter = [product.productId, product.cartId];

    let productAlreadyExists;

    try {
        productAlreadyExists = await connection.executeWithParameters(SQL, parameter);
        if (productAlreadyExists === null || productAlreadyExists.length === 0) {
            return false;
        }
        return true;
    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
 
}





module.exports = {
    addProductToCart,
    isProductExist
};