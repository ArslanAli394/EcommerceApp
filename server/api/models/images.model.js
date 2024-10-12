const mongoose = require('mongoose');

const Schema = mongoose.Schema;


let ImageSchema = new Schema({
    // itemId: { type: Schema.Types.ObjectId, ref: 'Item' },
    imagesUrl:[{
        type:String
    }]
});

module.exports = mongoose.model('ImageCollection',ImageSchema);