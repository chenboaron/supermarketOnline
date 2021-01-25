const express = require('express');
let cartsLogic = require("../logic/carts-logic");

const router = express.Router();




router.get('/', async (request, response, next) => {

    try {
        let allCartItems = await cartsLogic.getAllCartItems(request);
        response.json(allCartItems);
    } catch (error) {
        return next(error);
    }
});



router.post('/addProductToCart', async (request, response, next) => {

    let newProductData = request.body;
    try {
        await cartsLogic.addProductToCart(request, newProductData);

        response.json();
    } catch (error) {

        return next(error);
    }
});


router.delete('/deleteAllItems', async (request , response, next) => {
    try {
        await cartsLogic.deleteAllItems(request);
        response.json();
    } catch (error) {
        return next(error);
    }
});



router.delete('/deleteItem/:id', async (request, response, next) => {
    let productID = request.params.id;

    try {
        await cartsLogic.deleteItem(request, productID);

        response.json();
    } catch (error) {

        return next(error);
    }
});




module.exports = router;