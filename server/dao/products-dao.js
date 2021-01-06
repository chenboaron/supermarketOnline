let connection = require("./connection-wrapper");
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");


const getAllProducts = async () => {

    const SQL = `SELECT
                    product_id as productId,
                    product_name as productName,
                    product_category as productCategory,
                    product_Price as productPrice,
                    product_image_URL as imageURL,
                FROM
                products`;
    try {
        let allProducts = await connection.execute(SQL);

        return allProducts
    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}

const addProduct = async (newVacationData) => {

    const SQLInsertQuery = `INSERT INTO
                                vacations
                                    (
                                        Vacation_Name,
                                        Vacation_Description,
                                        Vacation_Price,
                                        Start_Date,
                                        End_Date,
                                        Image_URL,
                                        Followers_Count
                                    )
                                    VALUES (?, ?, ?, ?, ?, ?, 0)`;

    const parameters = [newVacationData.vacationName, newVacationData.vacationDescription,newVacationData.vacationPrice, newVacationData.startDate,
                        newVacationData.endDate, newVacationData.imageURL];


    // Retrieving the newly added vacation, because the DB generated the vacation's ID (Auto Incremented), and we need to retrieve it to the client

    const getnewlyAddedVacationSQL = `SELECT
                                            Vacation_ID as vacationID,
                                            Vacation_Name as vacationName,
                                            Vacation_Description as vacationDescription,
                                            Vacation_Price as vacationPrice,
                                            DATE_FORMAT(Start_Date, '%d/%m/%Y') as startDate,
                                            DATE_FORMAT(End_Date, '%d/%m/%Y') as endDate,
                                            Image_URL as imageURL,
                                            Followers_Count as followersCount
                                        From
                                            vacations
                                        WHERE
                                            Vacation_ID = (
                                                SELECT
                                                    MAX(Vacation_ID)
                                                FROM
                                                    vacations
                                            )`;

    try {
        await connection.executeWithParameters(SQLInsertQuery, parameters);
        let newlyAddedProduct = await connection.execute(getnewlyAddedProductSQL);

        return newlyAddedProduct;
    }catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}

const updateProduct = async (productID, newproductData) => {

    // Updating the vacation's info according to the parameters received from the admin (client)

    const SQL = `UPDATE
                    vacations
                    SET
                    Vacation_Name = ?,
                    Vacation_Description = ?,
                    Vacation_Price = ?,
                    Start_Date = ?,
                    End_Date = ?,
                    Image_URL = ?
                    WHERE
                    Vacation_ID = ?`;
                    
    const parameters = [newVacationData.vacationName, newVacationData.vacationDescription,newVacationData.vacationPrice, newVacationData.startDate,
                        newVacationData.endDate, newVacationData.imageURL, vacationID];

    try {
        await connection.executeWithParameters(SQL, parameters);
    } catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}

const deleteProduct = async (productID) => {

    // Creating the SQL queries for deleting the rows in the 'followed_vacations' and in the 'all vacations' tables

    const SQLDeleteFromFollowedTableQuery = `DELETE FROM
                                                followed_vacations
                                                    WHERE
                                                Vacation_ID = ?`;

    const SQLDeleteFromAllVacationsTableQuery = `DELETE FROM
                                                    vacations
                                                 WHERE
                                                    Vacation_ID = ?`;

    const parameter = [vacationID];

    try {

        // Sending the SQL queries and the parameter to the 'connection wrapper' preset
        await connection.executeWithParameters(SQLDeleteFromFollowedTableQuery, parameter);
        await connection.executeWithParameters(SQLDeleteFromAllVacationsTableQuery, parameter);
    } catch (error) {
        
        // Technical Error
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
}



module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct
};