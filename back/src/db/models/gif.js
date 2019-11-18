const { Schema, model } = require('mongoose');

const schema = new Schema({
    giffyID: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

module.exports.Gif = model("Gif", schema);