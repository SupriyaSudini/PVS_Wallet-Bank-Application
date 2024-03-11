const jwt = require('jsonwebtoken');

// decrypt token

module.exports = function(req, res, next){
    try {
        const token = req.headers.authorization.split(" ")[1];  
        // in axios we can see that 0 is bearer and the the 1 is actual data so we have used 1
        const decoded = jwt.verify(token, process.env.jwt_secret);
        req.body.userId = decoded.userId;
        next();   // this will go to userRoutes.js
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
        });
    }
}