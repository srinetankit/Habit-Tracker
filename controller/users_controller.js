// Import model of db
const User = require('../models/user');

// Render the sign up page
module.exports.signUp = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('user_signUp', {
        title: "Sign Up | Habit Tracker"
    });
};

// Export the create function as a module
module.exports.create = async (req, res) => {
    if (req.body.password !== req.body.confirm_password){
        req.flash('error', 'Passwords do not match !'); // Set flash error message
        return res.redirect('back'); // Redirect back if password and confirm password don't match
    }
       
    try {
        // Check if a user with the provided email already exists
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            // If no user with the email exists, create a new user
            await User.create(req.body);
            console.log('User created:', req.body);
            req.flash('success', "Account created successfully!"); // Set flash success message
            return res.redirect('/users/sign-in'); // Redirect to sign-in page after successful registration
        } else {
            // If a user with the email already exists, redirect to sign-up page
            req.flash('error', "User with this email already exists");
            return res.redirect('/users/sign-up');
        }
    } catch (err) {
        console.log('Error:', err);
        req.flash('error', "An error occurred. Please try again"); // Set flash error message
        return res.redirect('/'); // Handle the error gracefully, maybe redirect to an error page
    }
};

// Sign in and create a session for user
module.exports.createSession = (req, res) => {
    req.flash('success', "Logged In Successfully!");
    return res.redirect('/');
};

module.exports.signIn = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    
    return res.render('user_signIn', {
        title: "Sign In | Habit Tracker",
        
    });
};

module.exports.destroySession = (req, res, done) => {
    req.logout((err) => {
        if (err) {
            return done(err);
        }
    });
    return res.redirect('/users/sign-in');
};
