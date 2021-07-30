import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'
import asyncHandler from "express-async-handler"

const protect = asyncHandler(async(req, res, next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        try {
           token = req.headers.authorization.split(' ')[1]
           const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_STRING) 

           console.log(decodedToken)
           req.user = await User.findById(decodedToken.id).select('-password');
           next()
        } catch (err) {
            res.status(401)
            res.json({message : "You need to be logged in first"})
            throw new Error('Not authorized, You need to be logged in first')
        }
    }else if(!token){
        
        res.status(401)
        res.json({ message : "You need to be logged in first"})
        throw new Error('Not authorizes, no token, You need to be logged in first')
    }
})

export {protect}