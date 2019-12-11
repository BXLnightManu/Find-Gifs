const passport = require('passport');
const { User } = require('../db/models');

function updateProfile(req, res) {
    if(!req.body.firstname || !req.body.lastname || !req.body.email || Object.keys(req.body).length < 3) {
        res.status(400).json({
            payload: {
                ok: false,
                message: "The payload is not valid. Maybe field(s) are missing"
            }
        });
        return;
    }
    if(typeof req.body.firstname !=="string") {
        res.status(400).json({
            payload: {
                ok: false,
                message: "Must provide a valid firstname !"
            }
        });
        return;
    }
    if(typeof req.body.lastname !=="string") {
        res.status(400).json({
            payload: {
                ok: false,
                message: "Must provide a valid lastname !"
            }
        });
        return;
    }
    if(typeof req.body.email !=="string") {
        res.status(400).json({
            payload: {
                ok: false,
                message: "Must provide a valid email !"
            }
        });
        return;
    }
    const { firstname, lastname, email } = req.body;
    passport.authenticate('jwt',(err, user, info) => {
        if(err) return res.status(500).send(err.message)
        if (!user) return res.status(400).json({ redirect: false, payload: { ok: false, message: info.message } });
        User.findOneAndUpdate({_id: user}, { $set: { firstname, lastname, email } }, {new: true})
            .then(newUser => {
                res.status(200).json(
                    {
                        payload: {
                            ok: true,
                            lightUser:
                            {
                                firstname: newUser.firstname,
                                lastname: newUser.lastname,
                                email: newUser.email,
                                imageProfile: newUser.imageProfile
                            }
                        }
                    });
            })
            .catch(err => {
                res.status(500).json({redirect: false, open: true, payload: {ok: false, message: err.message || "REGISTRATION FAILED" }});
                console.log(err.message);
            })
        })(req, res);
};

function deleteProfile(req, res) {
    passport.authenticate('jwt',(err, user, info) => {
        if(err) return res.status(500).send(err.message)
        if (!user) return res.status(400).json({ redirect: false, payload: { ok: false, message: info.message } });
        User.findOneAndDelete({_id: user})
            .then(deleteProfile => {
                if(!deleteProfile) {
                    console.log(`Failed to remove user (id recieved from frontend: ${user})`)
                    res.json({ payload: { ok: false, message: null } });
                    return;
                } res.json({ payload: { ok: true, message: "Your are unsubscribed from Gigfs Finder. See You..." } });
            })
    })(req, res);
}

module.exports = {
    updateProfile,
    deleteProfile
};