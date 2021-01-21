let connection = require("./connection-wrapper");
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");


const getAllCartItems = async (id) => {

    const SQL = "SELECT c.product_id as productId, c.amount as amount, c.total_price as totalPrice, (SELECT product_name FROM products WHERE product_id = c.product_id) as productName FROM `shopping-carts` s LEFT JOIN `cart-items` c ON s.cart_id = c.cart_id WHERE s.cret_owner = ? AND s.is_open = '1'  ";
    const parameters = [id]
    try {
        let allCartItems = await connection.executeWithParameters(SQL, parameters);
        return allCartItems
    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}




const addProductToCart = async (isProductExist, newProductData, userId) => {
    if (isProductExist) {
        const SQLUpdateQuery = "UPDATE `cart-items` SET amount=? , total_price=(SELECT product_price  FROM products  WHERE product_id = ?)*?  WHERE product_id=? And cart_id =(select cart_id from  `shopping-carts` where cret_owner = ? and is_open='1')";
        const parametersOfUpdate = [newProductData.amount, newProductData.productId, newProductData.amount, newProductData.productId, userId];
        try {
            await connection.executeWithParameters(SQLUpdateQuery, parametersOfUpdate);

        } catch (error) {
            throw new ServerError(ErrorType.GENERAL_ERROR);
        }

    } else {
        const SQLInsertQuery = "INSERT INTO `cart-items` (product_id, amount, cart_id, total_price) VALUES (?,?,(select cart_id from  `shopping-carts` where cret_owner = ? and is_open='1') ,(SELECT product_price  FROM products  WHERE product_id = ?)*?)";

        const parameters = [newProductData.productId, newProductData.amount, userId, newProductData.productId, newProductData.amount];

        try {
            await connection.executeWithParameters(SQLInsertQuery, parameters);

        } catch (error) {
            throw new ServerError(ErrorType.GENERAL_ERROR);
        }
    }
}


const isProductExist = async (product, userId) => {
    const SQL = "SELECT product_id FROM `cart-items` WHERE product_id=? And cart_id =(select cart_id from  `shopping-carts` where cret_owner = ? and is_open='1')  ";
    const parameter = [product.productId, userId];

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

const deleteProduct = async (productId) => {

    const SQL = "DELETE FROM `cart-items` WHERE product_id = ?";

    const parameter = [productId];
    try {
        await connection.executeWithParameters(SQL, parameter);
    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}



module.exports = {
    addProductToCart,
    isProductExist,
    getAllCartItems,
    deleteProduct
};