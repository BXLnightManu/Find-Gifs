const { connect } = require('mongoose');
const { CONFIG } = require('./credentials');

const URI = `mongodb+srv://${CONFIG.user}:${CONFIG.password}@cluster0-dkizu.mongodb.net/${CONFIG.db}?retryWrites=true&w=majority`;

module.exports.db = () => {
    return connect(
        URI,
        { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }
    );
};