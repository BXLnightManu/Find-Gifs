const { signUpRouter, signInRouter } = require('./auth');

function registerAuthRoutes(app) {
    app.use('/auth', signUpRouter);
    app.use('/auth', signInRouter);
};

module.exports = {
    registerAuthRoutes
}