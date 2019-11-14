const { registerAuthRoutes } = require('../auth');
const { gifRouter } = require('./gif');

function registerRoutes(app) {

    // authentification routes
    registerAuthRoutes(app);

    // entity routes
    app.use("/gifs", gifRouter);
}

module.exports = {
    registerRoutes
}
