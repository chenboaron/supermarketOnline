let connection = require("./connection-wrapper");
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");


const getAllProducts = async () => {

    const SQL = "SELECT  product_id as productId, product_name as productName,(SELECT `category_name` FROM `supermarket-online`.`products-categories` WHERE `supermarket-online`.`products`.product_category = `supermarket-online`.`products-categories`.category_id ) as productCategory, product_price as productPrice, product_image_URL as imageURL FROM `supermarket-online`.products";
    try {
        let allProducts = await connection.execute(SQL);
        return allProducts
    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}
const addProduct = async (newProductData) => {
    const SQLInsertQuery = "INSERT INTO products ( product_name, product_category, product_Price, product_image_URL ) VALUES (?,  (SELECT category_id FROM `products-categories` WHERE category_name =?), ?, ?)";
    console.log("newProductData : " + JSON.stringify(newProductData));

    const parameters = [newProductData.productName, newProductData.productCategory, newProductData.productPrice, newProductData.imageURL];
    try {
        let id = await connection.executeWithParameters(SQLInsertQuery, parameters);
        console.log("id : " + JSON.stringify(id));
        return id.insertId;
    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

const updateProduct = async (newProductData) => {

    const SQL = "UPDATE products SET product_name = ?, product_category = (SELECT category_id FROM `products-categories` WHERE category_name =?), product_Price = ?, product_image_URL = ? WHERE product_id = ?";
    const parameters = [newProductData.productName, newProductData.productCategory, newProductData.productPrice, newProductData.imageURL, newProductData.productId];

    try {
        await connection.executeWithParameters(SQL, parameters);
    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}

const isProductExist = async (productId) => {

    const SQL = "SELECT product_id FROM products WHERE product_id=?";
    const parameter = [productId];

    console.log("productId : " + productId);
    let productAlreadyExists;

    try {
        productAlreadyExists = await connection.executeWithParameters(SQL, parameter);
        if (productAlreadyExists.length === 0) {
            return false;
        }
        return true;
    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}




module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    isProductExist,


};