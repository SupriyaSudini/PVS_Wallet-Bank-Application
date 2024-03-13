const express = require('express');
const app = express();

require('dotenv').config();
app.use(express.json());
const dbConfig = require('./config/dbConfig.js');
const usersRoute = require('./routes/userRoute.js');
const transactionsRoute = require('./routes/transactionsRoutes.js');
const requestsRoute = require('./routes/requestsRoute.js');

// entry point for user route
app.use('/api/users', usersRoute);

//entry point for transaction route
app.use('/api/transactions', transactionsRoute);

// call the end points in routes folder here 
app.use('/api/requests', requestsRoute);

const PORT = 5000;
const path = require("path");
_dirname = path.resolve();

// // heroku deployment
// if(process.env.NODE_ENV === "production"){
//     app.use(express.static("client/build"));
//     app.get("*",(req, res)=>{
//         res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//     });
// }

app.listen(PORT, () => {
    console.log(`Server started on Port ${PORT}`);
});

