// Declaration of all the necessary libraries
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// Configuration of the application server
const { db } = require('./db/conf');
const { User } = require('./db/models');
const port = 5000;
const app = express();
app.use(bodyParser.urlencoded({ extended:  false }));
app.use(bodyParser.json());
app.use(express.static(__dirname  +  '/public'));

// Auhtentication strategy
app.use(passport.initialize());
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(username, password, done) {
      User.findOne({ email: username }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
        }
        const hash = bcrypt.compareSync(password, user.password)
        if (!hash) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

// Functionalities of the application (Implementation of the API part)
const { registerAuthRoutes } = require('./auth');
registerAuthRoutes(app);

// Launch of the node server and the connection to the database
db()
    .then(() => {
        console.log("Connected to database!!");
        app.listen( port, err => {
            if(err) {
                // in case of a not found path, I return the 'Not Found' 404 code
                const err = new Error('Not Found');
                err.status = 404;
                throw err;
            }
            console.log('Listening on port '  +  port);
        })
    })
    .catch(err => {
        console.error(err.message);
    })