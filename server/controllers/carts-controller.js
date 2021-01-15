const express = require('express');
let cartsLogic = require("../logic/carts-logic");

const router = express.Router();

router.post('/addProductToCart', async (request, response, next) => {

    let newProductData = request.body;
    try {
        await cartsLogic.addProductToCart(request, newProductData);

        response.json();
    } catch (error) {

        return next(error);
    }
});

// router.get('/', async (request, response, next) => {

//     try {
//         let allProducts = await productsLogic.getAllProducts();
//         response.json(allProducts);
//     } catch (error) {
//         return next(error);
//     }
// });




// router.post('/deleteProduct/:id', async (request, response, next) => {

//     let productID = request.params.id;

//     try {
//         await productsLogic.deleteProduct(request, productID);

//         response.json();
//     }catch (error) {

//         return next(error);
//     }
// });

// router.put('/updateProduct/:id', async (request, response, next) => {


//     let productID = request.params.id;
//     let newProductData = request.body.newProductData;

//     try {

//         const imageURLToPreview = await productsLogic.updateProduct(request, productID, newProductData);

//         response.json(imageURLToPreview);
//     }catch (error) {

//         return next(error);
//     }
// });


module.exports = router;