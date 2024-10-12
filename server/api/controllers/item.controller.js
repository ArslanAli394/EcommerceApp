const Item = require("../models/item.model");
const Images = require("../models/images.model");
const ItemColor = require("../models/item.color.model");
const ItemColorImages = require("../models/item.color.image.model");

const getItems = async (req, res) => {
    await Item.find({}).populate("imagesUrl").exec((err, populatedItem) => {
        if (err) {
            console.error('Error populating item:', err);
        } else {
            console.log('Populated item:', populatedItem);
        }
    });
    
    // res.send(category);
};


const getItemById = async (req, res) => {

};

const addItemData = async (req, res) => {
    try {
        const { name, brandTitle, image, price, brandImages, colorImages } = req.body;
        let updatedItemColor, updatedColorImages;
        // Create a new item
        const newItem = new Item({
            name,
            brandTitle, 
            image,
            price,
        });

        // Save the new item
        const updatedItem = await newItem.save();

        // Create and save images
        const newImages = new Images({
            itemId: updatedItem._id,
            imagesUrl: brandImages,
        });
        const updatedImages = await newImages.save();

        // Create and save color images
        
        colorImages.length > 0 && await Promise.all(colorImages.map(async (element,index) => {
            // adding color
            const newItemColor = new ItemColor({
                itemId: updatedItem._id,
                color : element.color,
                rowId: index + 1,
                mainImage: updatedItem.image
            });
        
            updatedItemColor = await newItemColor.save();

            // adding color images
            const newItemColorImages = new ItemColorImages({
                colorId: updatedItemColor._id,
                itemColorImages: element.images
            })

            updatedColorImages = await newItemColorImages.save();
        }));
        
      
        // Populate ItemColor and ItemColorImage for a specific Item
        const result = await ItemColor.find({ itemId: updatedItem._id }).select('-__v -rowId -mainImage')
        .populate({
            path: 'itemColorImages',
            select: '-__v',
        })
        .exec();

        // // Respond with the updated item, images, and color images
        let response = {
            id:updatedItem._id,
            name:updatedItem.name,
            image:updatedItem.image,
            brandTitle:updatedItem.brandTitle,
            images:updatedImages.imagesUrl,
            itemColor: result
        }
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const updateItemDataById = async (req, res) => {

};

const deleteItemData = async (req, res) => {

};


module.exports = {
    getItems,
    getItemById,
    addItemData,
    updateItemDataById,
    deleteItemData
}