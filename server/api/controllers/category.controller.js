const Category = require("../models/category.model");

// desc:get category
//  route type : GET
// route : api/category
const getShopCategory = async (req, res) => {
  const category = await Category.find({}).populate({ path: "items" });
  console.log(category)
  res.send(category);
};
const getCategoryOnScroll = async (req, res) => {
  const skip = req.params.skip ? Number(req.params.skip) : 0;
  const DEFAULT_LIMIT = 2;

  try {
    const data = await Category.find({})
      .skip(skip)
      .limit(DEFAULT_LIMIT)
      .populate({ path: "items" });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(400).json({
      error: `Error getting posts: ${error.message}`,
    });
  }
};
// desc:shop data insert
//  route type : post
// route : api/category/add
const addShopCategory = async (req, res, next) => {
  const { id, title, routeName, linkUrl } = req.body;
  const newCategory = new Category({
    id,
    title,
    routeName,
    linkUrl,
  });
  const category = await newCategory.save();
  res.json(category);
};

// https://dev.to/oluseyeo/how-to-create-relationships-with-mongoose-and-node-js-11c8

// desc:categorywith their products
//  route type : post
// route : api/category/:id
const shopByCategory = (req, res, next) => {
  Category.find({ routeName: req.params.id })
    // ..and populate all of the notes associated with it
    .populate({ path: "items" })
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
  shopByCategory,
  addShopCategory,
  getShopCategory,
  getCategoryOnScroll,
};
