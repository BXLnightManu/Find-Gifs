const { Gif } = require('../db/models');

function getGifs(req, res) {
    Gif.find({})
        .then(gifs => {
            res.json({payload: {ok: true, value: gifs}});
        })
        .catch(err => {
            res.json({ payload: {ok:false, message: err.message || "FAILED" }});
        });
};

function postGif(req, res) {
    if (!req.body.giffyID || !req.body.title || !req.body.image || Object.keys(req.body).length < 3) {
        console.log(req.body);
        res.json({
            payload: {ok: false, message: "Nothing to update !"}
        });
        return;
    }
    const { giffyID, title, image } = req.body;
    const gif = new Gif({ giffyID, title, image });
    gif
        .save()
        .then((gif) => {
            res.json({ payload: {ok: true, value: gif}});
        })
        .catch(err => {
            res.json({payload: {ok: false, message: err.message || "FAILED" }});
        });
};

function deleteGif(req, res) {
    if (!req.params.giffyID || typeof req.params.giffyID !== "string") {
        res.json({
            ok: false,
            payload: "Must provide a valid payload !"
        });
    } else {
        const { giffyID } = req.params;
        Gif.findOneAndDelete({ giffyID })
            .then((deletedGif) => {
                if(!deletedGif) {
                    res.json({ payload: {ok: false, message: "ID provided does not exist"}});
                    return;
                }
                res.json({ payload: {ok: true, value: null} });
            })
            .catch(err => {
                res.json({ payload: {ok: false, message: err.message || "FAILED" }});
            });
    }
};

module.exports = {
    getGifs,
    postGif,
    deleteGif
};
