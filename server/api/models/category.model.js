const mongoose = require('mongoose');

const Schema = mongoose.Schema;


let CategorySchema = new Schema({
    id:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    routeName:{
        type:String,
        required:true
    },
    linkUrl:{
        type:String
    }
});
CategorySchema.virtual('items', {
    ref: 'Product', //The Model to use
    localField: '_id', //Find in Model, where localField 
    foreignField: 'categoryId', // is equal to foreignField
 });
 
 // Set Object and Json property to true. Default is set to false
 CategorySchema.set('toObject', { virtuals: true });
 CategorySchema.set('toJSON', { virtuals: true });
 
module.exports = mongoose.model('Category', CategorySchema);