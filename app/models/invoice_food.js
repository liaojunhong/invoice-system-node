const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const InvoiceFoodSchema = new Schema({
    invoice_id: {
        type: Schema.ObjectId,
        ref: 'Invoice'
    },
    food_name: {
        type: String,
        require: true
    },
    food_price: {
        type: Number,
        require: true,
        default: 0
    },
    food_num: {
        type: Number,
        require: true,
        default: 1
    }


});

InvoiceFoodSchema.statics.CountFood = function (invoice) {
    let invoice_food = this;


};


module.exports = mongoose.model('InvoiceFood', InvoiceFoodSchema);
