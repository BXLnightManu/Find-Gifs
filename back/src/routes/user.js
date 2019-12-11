const express = require('express');
const updateProfileRouter = express.Router();
const deleteProfileRouter = express.Router();
const { user } = require('../handlers');

updateProfileRouter.post("/updateprofile", user.updateProfile);
deleteProfileRouter.delete("/deleteprofile", user.deleteProfile);

module.exports = {
    updateProfileRouter,
    deleteProfileRouter
}