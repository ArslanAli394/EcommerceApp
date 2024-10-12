const express = require('express');
const router = express.Router();

//controllers
const ItemController = require('../controllers/item.controller');

// get route for shop
router.route('/').get(ItemController.getItems);


// get route for shop by id
router.route('/:ItemId').get(ItemController.getItemById);


//insert item into shop
router.route('/').post(ItemController.addItemData);


//update item in shop 
router.route('/update/:id').put(ItemController.updateItemDataById);

//delete item from shop
router.route('/delete/:id').delete(ItemController.deleteItemData);



module.exports = router;
