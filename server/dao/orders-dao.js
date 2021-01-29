let connection = require("./connection-wrapper");
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");



const order = async (orderDetails) => {
    const SQL = "INSERT INTO orders (order_owner, delivery_city, delivery_street, delivery_date, order_date, last_four_card_digits,  cart_id, total_price) VALUES (?,?,?,?,?,?,(select cart_id from  `shopping-carts` where cret_owner = ? and is_open='1'),(select sum(total_price) from `cart-items` where cart_id=(select cart_id from  `shopping-carts` where cret_owner = ? and is_open='1')))";
    const parameters = [orderDetails.userId, orderDetails.city, orderDetails.street, orderDetails.deliveryDate, orderDetails.orderDate, orderDetails.lastFourCardDigits, orderDetails.userId, orderDetails.userId];
    console.log("orderDetails = " + JSON.stringify(orderDetails));
    try {
        await connection.executeWithParameters(SQL, parameters);
    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}



const closeCart = async (userId) => {
    const SQL = "UPDATE `shopping-carts` SET is_open=0 WHERE cret_owner = ?";
    const parameters = [userId];
    try {
        await connection.executeWithParameters(SQL, parameters);
    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}




module.exports = {
    order,
    closeCart,
};