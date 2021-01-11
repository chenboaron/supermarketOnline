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

    const SQLInsertQuery = `INSERT INTO
                                    products
                                    (
                                        product_name,
                                        product_category,
                                        product_Price,
                                        product_image_URL,
                                    )
                                    VALUES (?, ?, ?, ?)`;

    const parameters = [newProductData.productName, newProductData.productCategory, newProductData.productPrice, newProductData.imageURL];

    const getnewlyAddedProductSQL = `SELECT
                                            product_id as productId,
                                            product_name as productName,
                                            product_category as productCategory,
                                            product_Price as productPrice,
                                            product_image_URL as imageURL,
                                        From
                                            products
                                        WHERE
                                            product_id = (
                                                SELECT
                                                    MAX(product_id)
                                                FROM
                                                    products
                                            )`;

    try {
        await connection.executeWithParameters(SQLInsertQuery, parameters);
        let newlyAddedProduct = await connection.execute(getnewlyAddedProductSQL);

        return newlyAddedProduct;
    }catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

const updateProduct = async (productId, newProductData) => {

    const SQL = `UPDATE
                    products
                    SET
                    product_name = ?,
                    product_category = ?,
                    product_Price = ?,
                    product_image_URL = ?,
                    WHERE
                    product_id = ?`;
                    
    const parameters = [newProductData.productName, newProductData.productCategory, newProductData.productPrice, newProductData.imageURL, productId];

    try {
        await connection.executeWithParameters(SQL, parameters);
    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}

const deleteProduct = async (productId) => {

    const SQL = `DELETE FROM
                    products
                    WHERE
                    product_id = ?`;

    const parameter = [productId];
    try {
        await connection.executeWithParameters(SQL, parameter);
    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}



module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct
};