const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const db_link='mongodb+srv://bhavya:bhavya@cluster0.yxwygwr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(db_link)
.then(function(db){
    console.log(db);
    console.log('db connected');
})
.catch(function(err){
    console.log(err);
})

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate: function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8,
        validate : function(){
            return this.confirmPassword==this.password;
        }
    },
    role:{
        type:String,
        enum:['admin','user','resturantowner','deliveryboy'],
        default:'user'
    },
    profileImage:{
        type:String,
        default:'img/users/default.jpeg'
    },
    resetToken:String
});

userSchema.pre('save',function(){
    this.confirmPassword=undefined;
    // console.log('before saving in db',this);
})

// userSchema.pre('save',async function(){
//     let salt  = await bcrypt.genSalt(10);
//     let hashedPassword = bcrypt.hash(this.password,salt);
//     // console.log('hashed password',hashedPassword);
//     this.password=hashedPassword;
// })

userSchema.methods.createResetToken=function(){
    const resetToken= crypto.randomBytes(32).toString("hex");
    this.resetToken = resetToken;
    return resetToken;
}

userSchema.methods.resetPasswordHandler=function(password,confirmPassword){
    this.password = password;
    this.confirmPassword=confirmPassword;
    this.resetToken = undefined;
};
//model
const userModel = mongoose.model('userModel',userSchema);
module.exports = userModel;
