const express = require('express');
const emailClientRouter = express.Router();
const { emailClient } = require('../handlers');

emailClientRouter.post("/", emailClient.sendEmail)

module.exports = {
    emailClientRouter
}