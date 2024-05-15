const express = require('express');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const { JWT_KEY } = require('../../secreats');

module.exports.signup = async function signup(req, res) {
    try {
        let dataObj = req.body;
        let user = await userModel.create(dataObj);
        if (user) {
            return res.json({
                message: "user signed up",
                data: user
            });
        }
        else {
            res.json({
                message: "error while signing in"
            });
        }
    }
    catch (err) {
        return res.json({
            message: err.message
        });
    }
}

module.exports.login = async function login(req, res) {
    try {
        let data = req.body;
        if (data.email) {
            let user = await userModel.findOne({ "email": data.email });
            if (user) {
                if (user.password == data.password) {
                    let uid = user['_id'];
                    let token = jwt.sign({ payload: uid }, JWT_KEY);
                    res.cookie('login', token, { httpOnly: true });
                    return res.json({
                        message: 'User has logged in',
                        userDetails: data
                    });
                }
                else {
                    return res.json({
                        message: 'wrong credentials'
                    })
                }
            }
            else {
                return res.json({
                    message: 'User not found'
                })
            }
        }
        else {
            return res.json({
                message: 'empty querry'
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

module.exports.isAuthorised=function isAuthorised(roles){
    return function(req,res,next){
        if(roles.includes(req.role)){
            next();
        }
        else{
            res.status(401).json({
                message:"Not allowed babes"
            })
        }
    }
}

module.exports.protectRoute=async function protectRoute(req, res, next) {
    try {
        let token;
        if (req.cookies.login) {
            console.log("req.cookies",req.cookies);
            token = req.cookies.login;
            let payload = jwt.verify(token, JWT_KEY);
            if (payload) {
                console.log("payloadtoken",payload);
                const user = await userModel.findById(payload.payload);
                req.role = user.role;
                req.id = user.id;
                console.log(req.role,req.id);
                next();
            }
            else {
                const client=req.get('User-Agent');
                if(client.includes("Mozilla")){
                    return res.redirect('/login');
                }
                return res.json({
                    message: "User is not valid"
                })
            }
        }
        else {
            return res.json({
                message: 'please login'
            })
        }
    }
    catch (err) {
        return res.json({
            message: err.message
        })
    }
};

module.exports.forgetpassword=async function forgetpassword(req,res){
    let {email} = req.body;
    try{
        const user = await userModel.findOne({email:email});
        if(user){
            const resetToken = user.createResetToken();
            let resetPasswordLink = `${req.protocol}://${req.get('host')}/resetpassword/${new_token}`;
        }
        else{
            return res.json({
                message:"please signup"
            });
        }
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
};

module.exports.resetpassword=async function resetpassword(req,res){
    try{
    const token = req.params.token;
    let {password,confirmPassword} = req.body;
    const user = await userModel.findOne({resetToken:token});
    if(user){
        await user.resetPasswordHandler(password,confirmPassword);
        await user.save();
        res.json({
            message:"Password change successfully"
        })
    }
    else{
        res.json({
            message:"User not found for password change"
        })
    }
}
catch(err){
    res.json({
        message:err.message
    })
}
}

module.exports.logout=function logout(req,res){
    res.cookie('login','',{maxAge:1})
    res.json({
        message:"user logged out"
    })
}
