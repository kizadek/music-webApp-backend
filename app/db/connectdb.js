require('dotenv').config({path: '/app/config/config.env'});


// Set up mongoose connection
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI


// Connecting to the database
const connectDB = async () =>{
    mongoose.connect(MONGODB_URI, {
        keepAlive: true,
    })
}
// .then(() => {
//     console.log("Successfully connected to the database");
// }).catch(err => {
//     console.log('Could not connect to the database. Exiting now...', err);
//     process.exit();
// });

// module.exports = mongoose.connection;

module.exports = connectDB;