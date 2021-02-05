const express = require('express');
let productsLogic = require("../logic/products-logic");

// creating a new Router object
const router = express.Router();


// ------------------------------ Handling The Vacations's Related Requests ------------------------------ //

router.get('/getAllProducts', async (request, response, next) => {

    try {
        let allProducts = await productsLogic.getAllProducts();
        response.json(allProducts);
    } catch (error) {
        return next(error);
    }
});


router.post('/', async (request, response, next) => {
console.log("router.post('/', async (request, response, next) ");
    let newProductData = request.body;

    try {
       await productsLogic.addOrEditProduct(request, newProductData);
        response.json();
    } catch (error) {
        return next(error);
    }
});




module.exports = router;