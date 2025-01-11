const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const {validationResult} = require('express-validator')
const blacklistTokenModel = require('../models/blacklistToken.model.js');


module.exports.registerUser = async(req,res,next)=>{
    // res.send("hello");
    // return;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    // console.log(req.body);
    const {fullname,email,password} = req.body;
    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });
    if(!user){
        res.send("Error While Entering Or User Already Exist");
    }
    else{
        const token = user.generateAuthToken();
        res.status(201).json({token,user});
    }
};

module.exports.loginUser = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email,password} = req.body;

    const user = await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({message:'Invalid Email or Password'});
    }

    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message:'Invalid Password'});
    }

    const token = user.generateAuthToken();

    res.cookie('token',token);

    res.status(200).json({token,user});
};

module.exports.getProfile = async(req,res,next)=>{
    res.status(200).json(req.user);
}

module.exports.logoutUser = async(req,res,next)=>{
    res.clearCookie('token');
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    await blacklistTokenModel.create({token});

    res.status(200).json({message: 'Logged Out'});
}