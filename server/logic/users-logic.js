let usersDao = require('../dao/users-dao');
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const userCache = require('../models/UserDataCache');
const extractUserDataFromCache = require('../models/ExtractUserDataFromCache');
const crypto = require('crypto');
let ServerError = require('../errors/server-error');
let ErrorType = require('../errors/error-type');

/**
 * 
 * @param {*} password 
 */
const generateHashedPassword = (password) => {
    const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
    return hashedPassword;
}

/**
 * 
 * @param {*} userData 
 */
const addUser = async (userData) => {

    let isUserExistByUsername = await usersDao.isUserExistByUserName(userData);
    if (isUserExistByUsername) {
        throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
    }

    if (userData.password != userData.passwordConfirm) {
        throw new ServerError(ErrorType.CONFIRM_PASSWORD_DOES_NOT_MATCH);
    }

    const isUserDataValid = validateUserDataIsValid(userData);
    if (isUserDataValid) {
        const saltedPassword = getSaltedPassword(userData.password);
        const hashedPassword = generateHashedPassword(saltedPassword);
        const userType = "USER";
        let userModifiedData = {
            userId: userData.userId,
            firstName: userData.firstName,
            lastName: userData.lastName,
            userName: userData.userName,
            password: hashedPassword,
            city: userData.city,
            street: userData.street,
            userType: userType
        }

        await usersDao.addUser(userModifiedData);
        let userDataToLogin = {
            userName: userModifiedData.userName,
            password: userModifiedData.password,
            firstName: userModifiedData.firstName
        }


        let userSuccessfulLoginServerResponse = login(userDataToLogin, true);
        return userSuccessfulLoginServerResponse;
    } else {
        throw new ServerError(ErrorType.INVALID_DATA);
    }
}


const validateUserDataIsValid = (userData) => {
    if (userData.userName.trim().length >= 3) {
        if (userData.password.trim().length >= 4) {
            if (userData.lastName.trim() !== "") {
                if (userData.firstName.trim() !== "") {
                    return true;
                }
            }
        }
    }

    return false;
}

/**
 * 
 */
const getLeftSaltedPasswordValue = () => {
    return '!@$g00gl3A$$i$t4nt$@!';
}

const getRightSaltedPasswordValue = () => {
    return 'I-L0v3-Fu115t4ck';
}

const getLeftSaltedUserNameValue = () => {
    return `b12%e3&$n!`;
}

const getRightSaltedUserNameValue = () => {
    return 'xHzG$!*^&!';
}

/**
 * 
 * @param {*} userPassword 
 */
const getSaltedPassword = (userPassword) => {
    const leftPasswordSalt = getLeftSaltedPasswordValue();
    const rightPasswordSalt = getRightSaltedPasswordValue();
    const saltedPassword = leftPasswordSalt + userPassword + rightPasswordSalt;

    return saltedPassword;
}

/**
 * 
 * @param {*} userName 
 */
const getSaltedUserName = (userName) => {
    const leftSalt = getLeftSaltedUserNameValue();
    const rightSalt = getRightSaltedUserNameValue();
    const saltedUserName = leftSalt + userName + rightSalt;

    return saltedUserName;
}

/**
 * 
 * @param {*} saltedUserName 
 */
const generateJWTtoken = (saltedUserName) => {
    const token = jwt.sign({ sub: saltedUserName }, config.secret);
    return token;
}

/**
 * 
 * @param {*} userID 
 * @param {*} userName 
 * @param {*} userType 
 * @param {*} token 
 */
const saveUserDataToServerCache = (userId, userName, userType, token) => {
    const userCacheData = {
        userId: userId,
        userName: userName,
        userType: userType,
        token: token
    };
    userCache.set(token, userCacheData);
}

/**
 * 
 * @param {*} request 
 */
const getUserInfo = (request) => {
    const userCacheData = extractUserDataFromCache(request);
    const userType = userCacheData.userType;
    const userName = userCacheData.userName;
    const userInfo = {
        userType,
        userName
    };

    return userInfo;
}

/**
 * 
 * @param {*} request 
 */
const logout = (request) => {
    let userCacheData = extractUserDataFromCache(request);
    let userToken = userCacheData.token;
    userCache.delete(userToken);
}

/**
 * 
 * @param {*} userData 
 * @param {*} isLoginRightAfterRegistration 
 */
const login = async (userData, isLoginRightAfterRegistration) => {
    if (!isLoginRightAfterRegistration) {
        const saltedPassword = getSaltedPassword(userData.password);
        userData.password = crypto.createHash('md5').update(saltedPassword).digest('hex');
    }

    const userLoginData = await usersDao.login(userData);
    const userType = userLoginData.userType;
    const firstName = userLoginData.firstName;
    const userId = userLoginData.userId;
    const saltedFirstName = getSaltedUserName(firstName);
    const token = generateJWTtoken(saltedFirstName);
    saveUserDataToServerCache(userId, firstName, userType, token);
    const userSuccessfulLoginServerResponse = {
        token: token,
        userType: userType,
        firstName: firstName
    }
    return userSuccessfulLoginServerResponse;
}


module.exports = {
    login,
    logout,
    addUser,
    getUserInfo
};
