const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const InvoiceSchema = new Schema({
    store: {
        type: Schema.ObjectId,
        ref: 'Store'
    },
    total_price: {
        type: Number,
        require: true,
        default: 0
    },
    invoice_date: {
        type: String,
        default: ''
    }

});




module.exports = mongoose.model('Invoice', InvoiceSchema);
