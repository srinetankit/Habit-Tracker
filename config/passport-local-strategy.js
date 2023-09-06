const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email'
},
    async (email, password, done) => {
        try {
            const user = await User.findOne({ email: email });
            if (!user || user.password !== password) {
                console.log('invalid username/password');
                return done(null, false);
            }
            return done(null, user);
        } catch (err) {
            console.log('error in finding user-->passport');
            return done(err);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id).exec();
        
        if (!user) {
            console.log('error in finding user-->passport');
            return done(null, false);
        }
        return done(null, user);
    } catch (err) {
        console.log('error in finding user-->passport', err);
        return done(err);
    }
});


passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/users/sign-in');
};

passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
};

module.exports = passport;
