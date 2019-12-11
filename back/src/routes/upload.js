const express = require('express');
const uploadRouter = express.Router();
const { upload } = require("../handlers");

uploadRouter.post("/", upload.upload.single("photo"), upload.photoProcessing);

module.exports = {
    uploadRouter
}