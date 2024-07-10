const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../../secreats');

function protectRoute(req,res,next){
    if(req.cookies.login){
        let isVerified = jwt.verify(req.cookies.login,JWT_KEY);
        if(isVerified){
            next();
        }
        else{
            return res.json({
                message:"User is not valid"
            })
        }
    }
    else{
        return res.json({
            message:'Access not allowed'
        })
    }
};

module.exports=protectRoute;