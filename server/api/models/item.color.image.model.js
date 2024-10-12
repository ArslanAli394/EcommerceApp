const mongoose = require('mongoose');

const Schema = mongoose.Schema;


let ItemColorImageSchema = new Schema({
    colorId: { type: Schema.Types.ObjectId, ref: 'itemColors' },
    itemColorImages:[{
        type:String
    }]
});


module.exports = mongoose.model('itemColorImages',ItemColorImageSchema);