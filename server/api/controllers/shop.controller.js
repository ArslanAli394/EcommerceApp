const Product = require("../models/product.model");
const Category = require("../models/category.model");

const getDataOnScroll = async (req, res) => {
  // console.log(req.params)
  // const skip = req.params.skip ? Number(req.params.skip) : 0;
  let skip = req.params.start ? Number(req.params.start) : 0;
  console.log(skip)
  const DEFAULT_LIMIT = 8;
  try {
    let category = await Category.find({ routeName: req.params.categoryId });
    // console.log(String(category[0]._id))
    const categoryId = String(category[0]._id);
    let data;
    Product.countDocuments({ categoryId: categoryId },  async (err, count) =>{
      if (err) {
        console.log(err);
      } else {
        
        if(count < DEFAULT_LIMIT){
          data = await Product.find({ categoryId });
          console.log(data)
        }else{  
          data = await Product.find({ categoryId })
          .skip(skip).limit(DEFAULT_LIMIT);
        }
        res.status(200).json({
          success: true,
          data,
          comingLen : data.length,
          total: count > 0 ? count : 0,
          totalPages: count > 8 ? Math.ceil(count/8): 1,
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      error: `Error getting posts: ${error.message}`,
    });
  }
};
// desc:shop data get
//  route type : GET
// route : api/shop
const getShopData = async (req, res) => {
  const products = await Product.find();
  res.send(products);
};

// desc:shop data get by color
//  route type : GET
// route : api/shopwithcolor/:color
const getShopDataColorWise = async (req, res) => {
  const products = await Product.find({
    color: req.params.color,
  });
  res.send(products);
};

// desc:shop data get by color multi
//  route type : GET
// route : api/shopwithmulticolor/:color
const getShopDataMultiColorWise = async (req, res) => {
  const products = await Product.find({
    $and: [{ color: req.params.color1 }, { color: req.params.color2 }],
  });
  res.send(products);
};
// desc:shop data get by category id
//  route type : GET
// route : api/shop/:id

const getShopDataById = (req, res, next) => {
  Product.find({ categroyId: req.params.categroyId }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data.length)
      res.json(data);

    }
  });
};
// desc:shop data update by id
//  route type : update
// route : api/shop/:id
const updateShopDataById = (req, res, next) => {
  Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.send({
          msg: "Product updated successfully !",
          data,
        });
      }
    }
  );
};

// desc:shop data insert
//  route type : post
// route : api/shop/add
const addShopData = async (req, res, next) => {
  const { id, name, price, imageUrl, color } = req.body;
  const newProduct = new Product({
    categoryId: req.params.categoryId,
    id,
    name,
    price,
    imageUrl,
    color,
  });
  const product = await newProduct.save();
  res.json(product);
};
// desc:shop data insert multiple
//  route type : post
// route : api/shop/addmany
const addManyShopData = async (req, res, next) => {
  const { items } = req.body;
  Product.insertMany(items, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data)
      res.send({
        msg: "data successfully added!",
        data,
        id: String(data._id),
      });
    }
  });
};

const deleteShopData = (req, res, next) => {
  Product.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
};

const shopProductWithCategory = (req, res, next) => {
  Product.findOne({})
    // ..and populate all of the notes associated with it
    .populate("categoryId")
    .then(function (dbProduct) {
      // If we were able to successfully find an Product with the given id, send it back to the client
      res.json(dbProduct);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
};
module.exports = {
  getShopData,
  addShopData,
  updateShopDataById,
  getShopDataById,
  deleteShopData,
  getShopDataColorWise,
  getShopDataMultiColorWise,
  addManyShopData,
  getDataOnScroll,
};
