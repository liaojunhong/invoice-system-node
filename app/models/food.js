const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const FoodSchema = new Schema({
    name: {
        type: String,
        require: true,
        default: ''
    },
    produce_price: {
        type: Number,
        require: true,
        default: 0
    },
    single_price: {
        type: Number,
        require: true,
        default: 0
    },
    create_date: {
        type: Date,
        default: Date.now
    }

});


module.exports = mongoose.model('Food', FoodSchema);
