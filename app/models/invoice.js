const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
    store:{
        type:Schema.ObjectId,
        ref:Store
    },
    foods:{

    },


});


module.exports = mongoose.model('Invoice', InvoiceSchema);
