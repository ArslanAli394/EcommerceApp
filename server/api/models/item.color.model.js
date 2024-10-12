const mongoose = require('mongoose');

const Schema = mongoose.Schema;


let ItemColorSchema = new Schema({
    // itemId: { type: Schema.Types.ObjectId, ref: 'Item' },
    color:{
        type: String
    },
    mainImage:{
        type: String
    },
    rowId :{
        type:Number
    }
        
});

ItemColorSchema.virtual('itemColorImages', {
    ref: 'itemColorImages', //The Model to use
    localField: '_id', //Find in Model, where localField 
    foreignField: 'colorId', // is equal to foreignField
 });
 
 // Set Object and Json property to true. Default is set to false
 ItemColorSchema.set('toObject', { virtuals: true });
 ItemColorSchema.set('toJSON', { virtuals: true });
 

module.exports = mongoose.model('ItemColors',ItemColorSchema);