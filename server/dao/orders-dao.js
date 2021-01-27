let connection = require("./connection-wrapper");
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");



const order = async (newOrder, userId) => {
        // const SQLUpdateQuery = "UPDATE `cart-items` SET amount=? , total_price=(SELECT product_price  FROM products  WHERE product_id = ?)*?  WHERE product_id=? And cart_id =(select cart_id from  `shopping-carts` where cret_owner = ? and is_open='1')";
        // const parametersOfUpdate = [newProductData.amount, newProductData.productId, newProductData.amount, newProductData.productId, userId];
        // try {
        //     await connection.executeWithParameters(SQLUpdateQuery, parametersOfUpdate);

        // } catch (error) {
        //     throw new ServerError(ErrorType.GENERAL_ERROR);
        // }

  
}

const deleteAllItemFromCart = async (newOrder, userId) => {

    // const SQL = "DELETE FROM `cart-items` WHERE cart_id =(select cart_id from  `shopping-carts` where cret_owner =? and is_open='1') ";

    // const parameter = [id];
    // try {
    //     await connection.executeWithParameters(SQL, parameter);
    // } catch (error) {
    //     throw new ServerError(ErrorType.GENERAL_ERROR);
    // }
}



module.exports = {
    order,
    deleteAllItemFromCart,
};