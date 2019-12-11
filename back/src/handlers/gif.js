const passport = require('passport');
const { Gif } = require('../db/models');
const { User } = require('../db/models');

function getGifs(req, res) {
    passport.authenticate('jwt',(err, user, info) => {
        if(err) return res.status(500).send(err.message)
        if (!user) return res.status(400).json({ redirect: false, payload: { ok: false, message: info.message } });
        User.findOne({_id: user})
            .populate("favoriteGifs.gif")
            .then(user => {
                const { favoriteGifs } = user;
                return favoriteGifs;
            })
            .then(gifs => {
                res.json({ payload: { ok: true, value: gifs } });
            })
            .catch(err => {
                res.json({ payload: { ok:false, message: err.message || "FAILED" } });
            });
    })(req, res)
};

function postGif(req, res) {
    if (!req.body.giffyID || !req.body.title || !req.body.image || !req.body.searchKey || Object.keys(req.body).length < 4) {
        res.json({
            payload: {ok: false, message: "Nothing to update !"}
        });
        return;
    }
    const { giffyID, title, image, searchKey } = req.body;
    passport.authenticate('jwt',(err, user, info) => {
        if(err) return res.status(500).send(err.message)
        if (!user) return res.status(400).json({ redirect: false, payload: { ok: false, message: info.message } });
        User.findOne({ _id: user })
            .populate("favoriteGifs.gif")
            .then(user => {
                const gifIds = user.favoriteGifs.map(favoriteGif => favoriteGif.gif.giffyID);
                if(gifIds.includes(giffyID)) {
                    res.json({ payload: { ok: false, message: `Gif "${title}" is already in your favorites !` } });
                } else {
                    Gif.findOne({ giffyID })
                        .then(existingGif => {
                            if(!existingGif) {
                                const gif = new Gif({ giffyID, title, image });
                                gif.save()
                                    .then(savedGif => {
                                        User.findOneAndUpdate({ _id: user }, { $addToSet: { favoriteGifs: { gif: savedGif._id, searchKey }} }, { new: false} )
                                            .then(() => {
                                                res.json({ payload: {ok: true, value: title}});
                                            })
                                    })
                            } else {
                                User.findOneAndUpdate({ _id: user }, {$addToSet: { favoriteGifs: { gif: existingGif._id, searchKey }}}, { new: false} )
                                    .then(() => {
                                        res.json({ payload: {ok: true, value: title}});
                                    })
                            }         

                        })
                }
            })
            .catch(err => {
                res.json({payload: {ok: false, message: err.message || "FAILED" }});
            });
    })(req, res);
}

function deleteGif(req, res) {
    if (!req.params.giffyID || typeof req.params.giffyID !== "string") {
        res.json({
            ok: false,
            payload: "Must provide a valid payload !"
        });
        return;
    }
    const { giffyID } = req.params;
    passport.authenticate('jwt',(err, user, info) => {
        if(err) return res.status(500).send(err.message)
        if (!user) return res.status(400).json({ redirect: false, payload: { ok: false, message: info.message } });
        User.findOne({ _id: user })
            .populate("favoriteGifs.gif")
            .then(user => {
                const targetGif = user.favoriteGifs.filter(favGif => favGif.gif.giffyID === giffyID);
                const gif = targetGif[0].gif._id;
                User.findOneAndUpdate({ _id: user }, { $pull: { favoriteGifs: { gif } } }, { new: true })
                    .populate("favoriteGifs.gif")
                    .then((updatedUser) => {
                        const remainingGiffies = updatedUser.favoriteGifs.map(favGif => favGif.gif.giffyID)
                        if(!remainingGiffies.includes(giffyID)) {
                            res.json(
                                {
                                    payload:
                                    {
                                        ok: true,
                                        value: 
                                        {
                                            removedGif: targetGif[0].gif.title,
                                            newFavorites: updatedUser.favoriteGifs
                                        }
                                    }
                                });
                            return;
                        }
                        res.json(
                            {
                                payload:
                                {
                                    ok: false,
                                    message: `FAILED: Gif ${gif} was not removed !`
                                }
                            });
                    })
            })
            .catch(err => {
                res.json({ payload: { ok: false, message: err.message || "FAILED" } });
            });
    })(req, res);
};

module.exports = {
    getGifs,
    postGif,
    deleteGif
};
