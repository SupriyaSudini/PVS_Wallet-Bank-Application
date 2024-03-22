require('dotenv').config();

const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://SupriyaSudini:sweety169@mernstack.jp9dzds.mongodb.net/Wallet_PVS');

mongoose.connect(process.env.MONGODB_URI);

const connectionResult = mongoose.connection;

connectionResult.on('error', () => {
   console.log(console, 'Connection error:');
});
connectionResult.on('connected', () => {
    console.log('MongoDB Connected successfully');
});

module.exports = connectionResult;