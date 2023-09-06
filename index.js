//import libraries 
const express = require('express');
const path = require('path');
const port = 8081;
const app = express();
const cookieParser = require('cookie-parser');

// Connect to MongoDB
const mongoose = require('mongoose');
const db = require('./config/mongoose');

// using flash library for showing user action notification
const flash = require('connect-flash');
const customMware = require('./config/flashMiddleware')

//used for session cookie 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// store user authentication because when seever restart no need to login again
const MongoStore = require('connect-mongo');

const bodyParser = require('body-parser');

// parse application/form-urlencoded, basically can only parse incoming Request Object if strings or arrays
app.use(bodyParser.urlencoded({ extended: false }));

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve the static files from the assets folder
app.use(express.static('./assets'));

// Setup JSON and URL encoded parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// mongo store is used to store the session cookie in the db 
app.use(session({
    name: "habbit tracker",
    // Change the secret before deployment in production
    secret: 'Nothing',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://habit:7HaOn91B9mVKvQOQ@cluster1.7trg1lt.mongodb.net/?retryWrites=true&w=majority',
        autoRemove: 'disabled'
    }),
    // Move the callback outside the store configuration object
    // This callback will be executed after the session store is set up
    // and is not a property of the store configuration
}, (err) => {
    console.log(err || 'connect-mongo setup ok');
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//---------Connect Flash----------//
app.use(flash());
app.use(customMware.setflash);


//set up routes
app.use('/', require('./routes/index'));

//Start the server
app.listen(port, function (err) {
    if (err) {
        console.log("Eroor in running the server", err);
    }
    console.log(`Running the server on port: ${port}`);
})