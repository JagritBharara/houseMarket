const userModel = require('../models/user.model');

module.exports.createUser = async({
    firstname,lastname,email,password
}) => {
    if(!firstname || !email || !password){
        throw new Error('All fields are required');
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        console.log("Exist")
        // throw new Error('Email is already registered');
        
        return null;
    }

    const user = userModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })

    return user;
}