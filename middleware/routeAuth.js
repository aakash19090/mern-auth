// ! This is used to create Protected Routes i.e. Routes that needs user to be logged in first by checking Auth Token

const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.checkAuth = async( req, res, next ) => {
    let token
    
    // ? STEP:1 Check if Authorization headers is present or not
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token){
        return res.status(401).json({ success: false, message: "No token found, cannot access this route" })
    }

    // ? STEP:2 Verify Token & return User
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id)  // ? Auth Token can be decoded from User details by extracting & matching ID

        if(!user){
            return res.status(404).json({ success: false, message: "User not found with this id" })
        }

        req.user = user

        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Not authorized to access this route" })
    }
}