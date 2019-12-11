const passport = require('passport');
const { User } = require('../db/models');
const multer = require('multer');
const fs = require('fs');
const FILEPATH = '../front/public/images';
const upload = multer({
    dest: `${FILEPATH}/`,
    limits: {
        fieldSize: 3 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed.'), false);
        }
        cb(null, true);
    }
})

function photoProcessing (req, res) {
    const photo = req.file;
    if(!photo || photo.length===0) {
        res.status(400).send({
            payload: {
                ok: false,
                message: "No photo is selected."
            }
        })
        return;
    }
    passport.authenticate('jwt',(err, user, info) => {
        if(err) return res.status(500).json(err.message)
        if (!user) return res.status(400).json({ redirect: false, payload: { ok: false, message: info.message } });
        if(!fs.existsSync(`../front/public/images/${user}`)) {
            fs.mkdirSync(`../front/public/images/${user}`)
        }
        fs.renameSync(
            photo.path,
            `../front/public/images/${user}/${photo.originalname}`,
            (err) => {
                if(err) {
                    console.log(`File "${photo.originalname}" was not successully renamed!`)
                }
            }
        );
        if(fs.existsSync(`../front/public/images/${user}/${photo.originalname}`)) {
            const fsPath = `../front/public/images/${user}/${photo.originalname}`;
            const frontEndpath = "./" + fsPath.slice(16);
            User.findOneAndUpdate({ _id: user }, { $set: { imageProfile: frontEndpath } }, { new: true })
                .then(user => {
                    res.json({ payload: {ok: true, lightUser: { firstname: user.firstname, lastname: user.lastname, email: user.email, imageProfile: user.imageProfile } } });
                })
                .catch(err => {
                    res.json({payload: {ok: false, message: err.message || "FAILED" }});
                })
        } else {
            console.error(`User ${user} was not successully updated because photo path was not found !`)
        }
    })(req, res);
}

module.exports = {
    upload,
    photoProcessing
}