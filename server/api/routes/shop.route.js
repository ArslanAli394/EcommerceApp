const express = require('express');
const router = express.Router();

//controllers
const shopController = require('../controllers/shop.controller');

// get route for shop
router.route('/').get(shopController.getShopData);

// get route for shop on scroll
router.route('/:categoryId/scroll/:start').get(shopController.getDataOnScroll);

// get route for shop by id
router.route('/:categoryId').get(shopController.getShopDataById);

// get shop data on color bases
router.route('/shopwithcolor/:color').get(shopController.getShopDataColorWise);

// get shop data on color bases multi color
router.route('/shopwithmulticolor/:color1/:color2').get(shopController.getShopDataMultiColorWise);


//insert item into shop
router.route('/add/:categoryId').post(shopController.addShopData);


//insert multiple item into shop
router.route('/addmany').post(shopController.addManyShopData);

//update item in shop 
router.route('/update/:id').put(shopController.updateShopDataById);

//delete item from shop
router.route('/shop/delete/:id').delete(shopController.deleteShopData);



module.exports = router;
