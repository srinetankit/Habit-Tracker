const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://habitdata:habit0033@cluster0.gdcw1lg.mongodb.net/');
mongoose.connect(`mongodb+srv://csv:n1bb5sZdHvvafrbG@cluster0.gdcw1lg.mongodb.net/?retryWrites=true&w=majority`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error Connection to MongoDB"));

db.once('open', function () {
    console.log('Conected to Database:: MongoDB');
})

module.exports = db;