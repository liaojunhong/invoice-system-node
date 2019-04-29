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

FoodSchema.statics.CheckFood = function (name, id) {
    var food = this;
    let param = {name: name};
    if(id) param._id = id;
    return new Promise(function (resolve, reject) {
        food.findOne(param).exec(function (err, data) {
            if (err) reject(err);
            else {
                if (data) resolve(data);
                else resolve(false);
            }
        })
    })
};



module.exports = mongoose.model('Food', FoodSchema);
