const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    name:{
        type:String,
        require:true,
        default:''
    },
    charge_person:{
        type:String,
        require:true,
        defualt:''
    },
    time_of_entry:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Store', StoreSchema);


