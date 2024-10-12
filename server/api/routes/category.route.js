const express = require('express');
const router = express.Router();


const categoryController = require('../controllers/category.controller');


//get all category
router.route('/').get(categoryController.getShopCategory);


// get route for category with shop on scroll
router.route('/scroll/:skip').get(categoryController.getCategoryOnScroll);

//add category route
router.route('/add').post(categoryController.addShopCategory);


//category id base all items
router.route('/:id').get(categoryController.shopByCategory);


module.exports = router;