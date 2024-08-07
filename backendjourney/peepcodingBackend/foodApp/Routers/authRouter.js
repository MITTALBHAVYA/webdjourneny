const express = require('express');
const authRouter = express.Router();
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../../secreats');

authRouter
.route('/signup')
.get(middleware1,getSignUp,middleware2)
.post(postSignUp);

authRouter
.route('/login')
.post(loginUser);

function middleware1(req,res,next){
    console.log("middleware1 executed");
    next();
}
function middleware2(req,res){
    console.log("middleware2 executed");
    console.log("middleware2 ended req/res cycle");
    res.sendFile('/public/index.html',{root:__dirname});

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

async function loginUser(req,res){
    
    try{
        let data = req.body;
        if(data.email){
        let user =await userModel.findOne({email:data.email});
        if(user){
            if(user.password == data.password){
                let uid = user['_id'];
                let token = jwt.sign({payload:uid},JWT_KEY);
                res.cookie('login',token,{httpOnly:true});
                return res.json({
                    message:'User has logged in',
                    userDetails:data
                });
            }
            else{
                return res.json({
                    message:'wrong credentials'
                })
            }
        }
        else{
            return res.json({
                message:'User not found'
            })
        }}
        else{
            return res.json({
                message:'empty querry'
            })
        }
    }
    catch(err){
        return res.status(500).json({
            message : err.message
        })
    }
}


module.exports=authRouter;