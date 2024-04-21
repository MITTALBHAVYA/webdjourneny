const express = require('express');
const app = express();
const userModel = require('./models/userModel');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.listen(3000);
app.use(cookieParser());
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
.route('/getCookies')
.get(getCookies);
userRouter
.route('/setCookies')
.get(setCookies);

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
    res.json({
        message:"data updated successfully",
        data:user
    })
};

async function deleteUser(req,res){
    let dataToBeDeleted=req.body;
    let user = await userModel.findOneAndDelete(dataToBeDeleted);
    res.json({
        message:"data has been deleted",
        data:user
    });
};

async function getUserById(req, res) {
    console.log(req.params.id);
    let paramId = req.params.id;

    try {
        let user = await userModel.findById(paramId); // Fetch user by ID from MongoDB
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.json({
            message: "req received",
            data: user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

function getSignUp(req,res,next){ 
    console.log("getSignUp called");
    next();
}

async function postSignUp(req,res){
    let dataObj = req.body;
    let user=await userModel.create(dataObj);
    res.json({
        message:"user signed up",
        data:user
    });
}

function setCookies(req,res){
  res.cookie('IsLoggedIn',true,{maxAge:1000*60*60*24,secure:true,httpOnly:true});
  res.cookie('isPrimeMember',true);
  res.send('cookies has been set');
}

function getCookies(req,res){
    let cookies = req.cookies.IsLoggedIn; 
    console.log(cookies);
    res.send('cookies received');
}

