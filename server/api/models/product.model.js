const mongoose = require('mongoose');

const Schema = mongoose.Schema;


let ProductSchema = new Schema({
    // categoryId:{
    //     type:Schema.Types.ObjectId,
    //     ref:"Category"
    // },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String
    },
    price:{
        type:Number,
        required:true
    },
    color:{
        type:Array
    }
});

module.exports = mongoose.model('Product',ProductSchema);