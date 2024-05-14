const userModel = require('../models/userModel');

module.exports.getUser=async function getUser(req,res){
    let id = req.id;
    console.log(id);
    let user=await userModel.findById(id);
    console.log("user :: ",user);
    if(user){
        return res.json(user);
    }
    else{
        return res.json({
            message:"user not found"
        })
    }
};


module.exports.updateUser=async function updateUser(req,res){
    // console.log('req.body->',req.body);
    try{
    let id=req.params.id;
    let user=await userModel.findById(id);
    let dataToBeUpdated = req.body;
    if(user){
        const keys=[];
        for(let key in dataToBeUpdated){
            keys.push(key);
        }

        for(let i=0;i<keys.length;i++){
            user[keys[i]]=dataToBeUpdated[keys[i]];
        }
        user.confirmPassword = user.password;
        const updatedData=await user.save();
        res.json({
            message:"data updated successfully",
            data:user
        })
    }
    else{
        res.json({
            message:"user not found"
        });
    }
}
catch(err){
    res.json({
        message:err.message,
    })
}
    
};

module.exports.deleteUser=async function deleteUser(req,res){
    try{
    let id=req.params.id;
    let user = await userModel.findByIdAndDelete(id);
    if(!user){
    res.json({
        message:"data has been deleted",
        data:user
    });}
    else{
        res.json({
            message:"USER NOT FOUND",
        })
    }
    }
    catch(err){
        res.json({
            message:err.message,
        })
    }
};

module.exports.getAllUser =async function getAllUser(req,res){
    let users = await userModel.find();
    if(users){
        res.json({
            message:'users retrieved',
            data:users
        });
    }
    res.send("user id received");
};
module.exports.getUserById=async function getUserById(req, res) {
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
// function setCookies(req,res){
//     res.cookie('IsLoggedIn',true,{maxAge:1000*60*60*24,secure:true,httpOnly:true});
//     res.cookie('isPrimeMember',true);
//     res.send('cookies has been set');
// };
  
// function getCookies(req,res){
//       let cookies = req.cookies.IsLoggedIn; 
//       console.log(cookies);
//       res.send('cookies received');
// };
