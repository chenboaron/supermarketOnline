const express = require('express');
let ordersLogic = require("../logic/orders-logic");

const router = express.Router();




router.get('/', async (request, response, next) => {
    let newOrder = request.body;
    try {
        await ordersLogic.order(request, newOrder);
        response.json();
    } catch (error) {
        return next(error);
    }
});






module.exports = router;