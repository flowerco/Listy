const mongoose = require('mongoose')
// const Schema = new mongoose.Schema;

const UserSchema = new mongoose.Schema({
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
})

module.exports = mongoose.model('User', UserSchema);