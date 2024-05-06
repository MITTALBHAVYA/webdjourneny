const express = require('express');
const userRouter = express.Router();
const userModel = require('../models/userModel');
const ProtectRoute = require('./authHelpers');
userRouter
.route('/')
.get(ProtectRoute,getUsers)
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
function setCookies(req,res){
    res.cookie('IsLoggedIn',true,{maxAge:1000*60*60*24,secure:true,httpOnly:true});
    res.cookie('isPrimeMember',true);
    res.send('cookies has been set');
};
  
function getCookies(req,res){
      let cookies = req.cookies.IsLoggedIn; 
      console.log(cookies);
      res.send('cookies received');
};

module.exports = userRouter;