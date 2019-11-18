const { gifRouter } = require('./gif');
const { signUpRouter, signInRouter } = require('./auth');

function registerRoutes(app) {

    // authentification routes
    app.use('/auth', signUpRouter);
    app.use('/auth', signInRouter);

    // entity routes
    app.use("/gifs", gifRouter);
}

module.exports = {
    registerRoutes
}
