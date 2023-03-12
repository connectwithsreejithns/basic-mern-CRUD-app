const jwt = require('jsonwebtoken')
const User=require('../models/user')

async function requireAuth(req, res, next) {
    try {
        //read  token off cookies
        const token = req.cookies.Authorization
        //Decode the token
        const decoded = jwt.verify(token, process.env.SECRET)
        //check expiration
        if (Date.now()>decoded.exp)return res.sendStatus(401)
        //Find the user using decoded sub
        const user =await User.findById(decoded.sub)
        if(!user) return res.sendStatus(401)
        //attach user to req
        req.user=user
        //continue on
        next();
    } catch (err) {
        return res.sendStatus(401)
    }
}
module.exports = requireAuth;