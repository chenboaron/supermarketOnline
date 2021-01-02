let connection = require("./connection-wrapper");
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");

/**
 * 
 * @param {*} user 
 */
const login = async (user) => {
    const SQL = "SELECT  user_id as userId, user_name as userName, user_type as userType FROM users where user_name =? and password =?";
    const parameters = [user.userName, user.password];
    let userLoginResult;
    try {
        userLoginResult = await connection.executeWithParameters(SQL, parameters);
    }catch (error) {
        console.log("error : " + error);
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }

    if (userLoginResult === null || userLoginResult.length === 0) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }
    return userLoginResult[0];
}


/**
 * 
 * @param {*} user 
 */
const addUser = async (user) => {
    const SQL = "INSERT INTO users (user_id, first_name, last_name, user_name, password, city, street, user_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const parameters = [user.userId, user.firstName, user.lastName, user.userName, user.password, user.city, user.street, user.userType];
    try {
        await connection.executeWithParameters(SQL, parameters);
    }catch (error) {
        console.log("lalalallaalal");
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
}


/**
 * 
 * @param {*} user 
 */
const isUserExistByUserName = async (user) => {
    const SQL = "SELECT User_Name FROM users WHERE User_Name =?";
    const parameter = [user.userName];

    let userNameAlreadyExists;

    try {
        userNameAlreadyExists = await connection.executeWithParameters(SQL, parameter);
    }catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, SQL, error);
    }
    if (userNameAlreadyExists === null || userNameAlreadyExists.length === 0) {
        return false;
    }
    return true;
}


module.exports = {
    login,
    addUser,
    isUserExistByUserName
};