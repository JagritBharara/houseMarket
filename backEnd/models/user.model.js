const mongoose = require('mongoose');
const bcyrpt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    fullname: {
        firstname:{
            type: String,
            required: true,
            minLength : [3,'First Name must be 3 character or long']
        },
        lastname:{
            type: String,
            minLength : [3,'Last Name must be 3 character or long']
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        minLength: [5,'Email must be atleast of length 5']
    },
    password:{
        type: String,
        required: true,
        select : false
    }
})


userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET,{expiresIn: '24h'});
    return token;
};
userSchema.methods.comparePassword = async function (password){
    return await bcyrpt.compare(password,this.password)
}

userSchema.statics.hashPassword = async function (password) {
    return await bcyrpt.hash(password,10);
}

const userModel = mongoose.model('user',userSchema);
module.exports = userModel;