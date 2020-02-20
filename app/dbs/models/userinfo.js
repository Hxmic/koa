const mongoose = require('mongoose');

let userInfoSchma = new mongoose.Schema({
    username: String,
    password: String,
    age: Number,
    sex: String
});

module.exports = mongoose.model('user', userInfoSchma);