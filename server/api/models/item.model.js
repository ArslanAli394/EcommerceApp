const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let ItemSchema = new Schema({

    name:{
        type:String,
        required:true
    },
    brandTitle:{
        type:String
    },
    image:{
        type:String,
    },
    price:{
        type:Number,
    },
    imagesUrl: { type: mongoose.Schema.Types.ObjectId, ref: 'ImageCollection' },
});

// ItemSchema.virtual('images', {
//     ref: 'ImageCollection', //The Model to use
//     localField: '_id', //Find in Model, where localField s
//     foreignField: 'itemId', // is equal to foreignField
//  });
//  ItemSchema.virtual('colors', {
//     ref: 'ItemColors', //The Model to use
//     localField: '_id', //Find in Model, where localField 
//     foreignField: 'colorId', // is equal to foreignField
//  });
 // Set Object and Json property to true. Default is set to false
//  ItemSchema.set('toObject', { virtuals: true });
//  ItemSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Item',ItemSchema);