const express = require('express');
const usersLogic = require("../logic/users-logic");
const router = express.Router();



router.post('/register', async (request, response, next) => {

    let userData = request.body;
    try {

        let successfullLoginData = await usersLogic.addUser(userData);
        response.json(successfullLoginData);
    } catch (error) {
        return next(error);
    }
});

router.post('/login', async (request, response, next) => {
    let userData = request.body;
    try {
        let successfullLoginData = await usersLogic.login(userData);
        response.json(successfullLoginData);
    }

    catch (error) {
        return next(error);
    }
});

router.post('/logout', async (request, response, next) => {
    try {
        await usersLogic.logout(request);
        response.json();
    } catch (error) {
        return next(error);
    }
});

router.post('/info', async (request, response, next) => {
    try {
        let userInfo = await usersLogic.getUserInfo(request);
        response.json(userInfo);
    }catch (error) {
        return next(error);
    }
});


module.exports = router;