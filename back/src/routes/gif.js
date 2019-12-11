const express = require('express');
const gifRouter = express.Router();
const { gif } = require('../handlers');

// LIST
gifRouter.get("/", gif.getGifs);

// SAVE GIF
gifRouter.post("/", gif.postGif);

// DELETE GIF
gifRouter.delete("/:giffyID", gif.deleteGif);

module.exports = {
    gifRouter
}