const express = require('express');
const passport = require('passport');
const gifRouter = express.Router();
const { gif } = require('../handlers');

// LIST
gifRouter.get("/", gif.getGifs);

// SAVE GIF
gifRouter.post("/", passport.authenticate('jwt', { session:  false }), gif.postGifs);

module.exports = {
    gifRouter
}