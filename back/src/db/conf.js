const { connect } = require('mongoose');
const { CONFIG, mongoDBPath } = require('./credentials');

const URI = `${mongoDBPath}/${CONFIG.db}`;

module.exports.db = () => {
    return connect(
        URI,
        { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }
    );
};