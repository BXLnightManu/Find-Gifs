const { gifRouter } = require('./gif');
const { signUpRouter, signInRouter } = require('./auth');
const { updateProfileRouter, deleteProfileRouter } = require('./user');
const { uploadRouter } = require('./upload');
const { emailClientRouter } = require('./emailClient');

function registerRoutes(app) {

    // authentification routes
    app.use("/auth", signUpRouter);
    app.use("/auth", signInRouter);

    // profile modification routes
    app.use("/user", updateProfileRouter);
    app.use("/user", deleteProfileRouter);

    // entity routes
    app.use("/gifs", gifRouter);

    // upload routes
    app.use("/photoupload", uploadRouter);

    // email client route
    app.use("/email", emailClientRouter);
}

module.exports = {
    registerRoutes
}
