const express = require('express');
const app = express();
const mongoose = require('mongoose');
const emailValidator = require('email-validator');
app.use(express.json());
app.listen(3000);

// let users=[
//     { 
//         'id':1,
//         'name':"Bhavya"
//     },
//     { 
//         'id':2,
//         'name':"Mittal"
//     },
//     { 
//         'id':3,
//         'name':"Kavya"
//     }
// ];

//mini app banayenge

const userRouter = express.Router();
const authRouter = express.Router();
app.use('/user',userRouter);
app.use('/auth',authRouter);

userRouter
.route('/')
.get(getUsers)
.post(postUser)
.patch(updateUser)
.delete(deleteUser);

userRouter
.route('/:id')
.get(getUserById);

authRouter
.route('/signup')
.get(middleware1,getSignUp,middleware2)
.post(postSignUp);

function middleware1(req,res,next){
    console.log("middleware1 executed");
    next();
}
function middleware2(req,res){
    console.log("middleware2 executed");
    // next();
    // res.json({message:"middleware2 ended req/res cycle"});
    console.log("middleware2 ended req/res cycle");
    res.sendFile('/public/index.html',{root:__dirname});

}
async function getUsers(req,res){
    let allUsers =await userModel.findOne({name:'Bhavya'});
    res.json({message:'list of all users',
     data : allUsers});

};

function postUser(req,res){
    console.log(req.body);
    users=req.body;
    res.json({
        message:"data received successfully",
        user:req.body
    })
};

async function updateUser(req,res){
    console.log('req.body->',req.body);
    let dataToBeUpdated = req.body;
    let user = await userModel.findOneAndUpdate({email:'kavya123@gmail.com'},dataToBeUpdated);
    // for(key in dataToBeUpdated){
    //     users[key]=dataToBeUpdated[key];
    // }
    res.json({
        message:"data updated successfully",
        data:user
    })
};

async function deleteUser(req,res){
    // users={};
    let dataToBeDeleted=req.body;
    let user = await userModel.findOneAndDelete(dataToBeDeleted);
    res.json({
        message:"data has been deleted",
        data:user
    });
};

function getUserById(req,res){
    console.log(req.params.id);
    let paramId = req.params.id;
    let obj = {};
    for(let i=0;i<users.length;i++){
        if(users[i]['id']==paramId){
            obj = users[i];
        }
    }

    res.json({
        message:"req received",
        data:obj
    });
}

function getSignUp(req,res,next){
    
    console.log("getSignUp called");
    // res.sendFile('public/index.html',{root: __dirname});
    next();
}

async function postSignUp(req,res){
    let dataObj = req.body;
    let user=await userModel.create(dataObj);
    //  console.log("backend",user)
    res.json({
        message:"user signed up",
        data:user
    });
}
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
    }

});

userSchema.pre('save',function(){
    this.confirmPassword=undefined;
    console.log('before saving in db',this);
})
userSchema.post('save',function(doc){
    console.log('after saving in db',doc);
})

//model
const userModel = mongoose.model('userModel',userSchema);

// (async function createUser(){
//     let user = {
//         name:'Bhavya',
//         email:'bhavyva@gmail.com',
//         password:'123456789',
//         confirmPassword:'123456789'
//     };
//     let data =await userModel.create(user);
//     console.log(data);
// })();
