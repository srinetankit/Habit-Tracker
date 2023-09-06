const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://habit:7HaOn91B9mVKvQOQ@cluster1.7trg1lt.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error Connection to MongoDB"));

db.once('open', function () {
    console.log('Conected to Database:: MongoDB');
})

module.exports = db;