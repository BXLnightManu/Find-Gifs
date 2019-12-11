const express = require('express');
const signUpRouter = express.Router();
const signInRouter = express.Router();
const { auth } = require('../handlers');

signUpRouter.post("/signup", auth.signUp);
signInRouter.post("/signin", auth.signIn);

module.exports = {
    signUpRouter,
    signInRouter
}