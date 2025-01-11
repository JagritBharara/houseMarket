const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/blacklistToken.model.js');


module.exports.authUser = async(req,res,next)=>{
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }

    const isBlackListToken = await BlacklistedToken.findOne({token:token})
    if(isBlackListToken){
        res.status(401).json({message: "Unauthorized"});
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;
        return next();
    }catch(err){
        console.log(err);
        return res.status(401).json({message: 'Unauthorized'});
    }
}