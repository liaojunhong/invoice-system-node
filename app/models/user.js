const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: true
    },
    password: {
        type: String,
        default: ''
    },
    register_time: {
        type: Date,
        default: Date.now
    },
    permission: {
        type: Number,
        enum: [1, 2],
        default: 2//  1: admin 2 : 用户
    }
});

UserSchema.methods = {
    ComparePassword: function (password) {
        const user = this;
        return new Promise(function (rev, rej) {
            bcrypt.compare(password, user.password, function (err, isMatch) {
                if (err) return rej(err);
                rev(isMatch)
            })
        })
    }
};

UserSchema.pre('save', function (next) {
    let user = this;
    bcrypt.genSalt(10, function (err, salt) {
        if (err) next(err);
        bcrypt.hash(user.password, salt, function (errs, hashed_password) {
            if (errs) return next(errs);
            user.password = hashed_password;
            next();
        })
    });
});

UserSchema.statics.CheckUser = function (name) {
    var user = this;
    return new Promise(function (resolve, reject) {
        user.findOne({name: name}).exec(function (err, data) {
            if (err) reject(err);
            else {
                if (data) resolve(data);
                else resolve(false);
            }
        });

    })
};


module.exports = mongoose.model('User', UserSchema);
