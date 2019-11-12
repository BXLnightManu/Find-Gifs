const { connect } = require('mongoose');

const CONFIG = {
    db: "gifsFinder"
}

const URI = `mongodb://192.168.0.142:27017/${CONFIG.db}`;

module.exports.db = () => {
    return connect(
        URI,
        { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }
    );
};