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
        default:''
    },
    time_of_entry:{
        type:Date,
        default:Date.now
    }
});

StoreSchema.statics.CheckStore = function (name, id) {
    var store = this;
    let param = {name: name};
    if(id) param._id = id;
    return new Promise(function (resolve, reject) {
        store.findOne(param).exec(function (err, data) {
            if (err) reject(err);
            else {
                if (data) resolve(data);
                else resolve(false);
            }
        })
    })
};

module.exports = mongoose.model('Store', StoreSchema);


