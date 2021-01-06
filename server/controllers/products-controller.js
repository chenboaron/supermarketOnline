const express = require('express');
const multer = require('multer');
let productsLogic = require("../logic/products-logic");

// creating a new Router object
const router = express.Router();


// ------------------------------ Handling The Vacations's Related Requests ------------------------------ //

router.get('/', async (request, response, next) => {

    try {
        let allProducts = await productsLogic.getAllProducts();
        response.json(allProducts);
    } catch (error) {
        return next(error);
    }
});


router.post('/addProduct', async (request, response, next) => {

    let newProductData = request.body;

    try {
        let newlyAddedProduct = await productsLogic.addProduct(request, newProductData);

        response.json(newlyAddedProduct);
    } catch (error) {

        return next(error);
    }
});

router.post('/deleteProduct/:id', async (request, response, next) => {

    let productID = request.params.id;

    try {
        await productsLogic.deleteProduct(request, productID);

        response.json();
    }catch (error) {

        return next(error);
    }
});

router.put('/updateProduct/:id', async (request, response, next) => {


    let productID = request.params.id;
    let newProductData = request.body.newProductData;

    try {

        const imageURLToPreview = await productsLogic.updateProduct(request, productID, newProductData);

        response.json(imageURLToPreview);
    }catch (error) {

        return next(error);
    }
});


module.exports = router;