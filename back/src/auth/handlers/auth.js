const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const { User } = require('../../db/models');
const mySecret = "The village of Konoha";

function signUp(req, res) {
    if(!req.body.email || !req.body.password || !req.body.firstname || !req.body.lastname || Object.keys(req.body).length < 4) {
        res.json({
            flash: 'The payload is not valid. Maybe required field(s) are missing'
        });
        return;
    }
    if(typeof req.body.firstname !=="string") {
        res.json({
            flash: 'Must provide a valid firstname !'
        });
        return;
    }
    if(typeof req.body.lastname !=="string") {
        res.json({
            flash: 'Must provide a valid lastname !'
        });
        return;
    }
    const { password } = req.body;
    bcrypt
        .hash(password, saltRounds)
        .then(hash => {
            const { email, firstname, lastname } = req.body;
            const user = new User({email, password: hash, firstname, lastname});
            user
                .save()
                .then(user => {
                    res.status(200).json({redirect: true, open: false, flash: `${user.firstname} ${user.lastname} has been signed up!`});
                    console.log(`${user.firstname} ${user.lastname} has been signed up!`);
                })
                .catch(err => {
                    res.status(500).json({redirect: false, open: true, flash: err.message || "REGISTRATION FAILED" });
                    console.log(err.message);
                })
    });
};

function signIn(req, res) {
    passport.authenticate('local',(err, user, info) => {
        if(err) return res.status(500).send(err.message)
        if (!user) return res.status(400).json({flash: info.message, redirect: false});
        const token = jwt.sign(JSON.stringify(user), mySecret);
        console.log( `Welcome, ${user.firstname} ${user.lastname}!`);
        return res.json({user, token, flash: ` Welcome, ${user.firstname} ${user.lastname} !`, redirect: true});
    })(req, res)
};

module.exports = {
    signUp,
    signIn
};