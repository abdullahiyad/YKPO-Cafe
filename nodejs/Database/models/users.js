const mongoose = require('mongoose');
const {isEmail, isNumeric, isStrongPassword,} = require("validator");
const bcrypt = require('bcrypt');
const user_schema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"Please enter your name"],
        minlength: 2,
    },
    phone: {
        type:String,
        required:[true,"Please enter your phone number"],
        unique: [true,"This phone number is already used"],
        minlength:[10,"Phone number must has 10 numbers"],
        validate:[isNumeric,"Phone number must have just a number"],
    },
    email: {
        type:String,
        required:[true,"Please enter your email"],
        unique: [true,"this email is already in use"],
        lowercase: true,
        validate: [isEmail,"Please enter a valid email"],
    },
    password: {
        type:String,
        required:[true,"Please enter a password"],
        minlength:[8,"The minimum password length is 8"],
        validate:[isStrongPassword,"enter strong password"],
    },
    status: {
        type:String,
        default:"person"
    },
    profilePic: {
        type:String,
        default:"None.png"
    },
    score: {
        type:Number,
        default:0
    }
});

//after store in db
user_schema.pre('save', async function (next){
    const added = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, added);
    next();
});

const user = mongoose.model('user',user_schema);

module.exports = user;
 