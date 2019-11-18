const express = require('express');
const passport = require('passport');
const gifRouter = express.Router();
const { gif } = require('../handlers');

// LIST
gifRouter.get("/", passport.authenticate('jwt', { session:  false }), gif.getGifs);

// SAVE GIF
gifRouter.post("/", gif.postGifs);

module.exports = {
    gifRouter
}