const { Gif } = require('../db/models');

function getGifs(req, res) {
    Gif.find({})
        .then(gifs => {
            res.json(gifs);
        })
        .catch(err => {
            res.json({ message: err.message || "FAILED" });
        });
};

function postGifs(req, res) {
    if (!req.body.giffyID || !req.body.title || !req.body.image || Object.keys(req.body).length < 3) {
        res.json({
            message: "Nothing to update !"
        });
        return;
    }
    const { giffyID, title, image } = req.body;
    const gif = new Gif({ giffyID, title, image });
    gif
        .save()
        .then(gif => {
            res.json({ gif });
        })
        .catch(err => {
            res.json({ message: err.message || "FAILED" });
        });
};

module.exports = {
    getGifs,
    postGifs
};
