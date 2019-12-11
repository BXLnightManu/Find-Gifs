const { Schema, model, SchemaTypes } = require('mongoose');

const schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    imageProfile: {
        type: String,
        required: false
    },
    userGroup: {
        type: String,
        enum: ["admin", "user"],
        required: true
    },
    favoriteGifs: [
        { 
            gif: {
                type: SchemaTypes.ObjectId,
                unique: true,
                ref: "Gif"
            },
            searchKey: {
                type: String,
                unique: false
            }
        }
    ]
})

module.exports.User = model("User", schema);