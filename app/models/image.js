const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ImageSchema = new Schema({
    img: {
        type: Buffer,
        required: true,
        default: ''
    }
})






module.exports = mongoose.model('Image', ImageSchema);