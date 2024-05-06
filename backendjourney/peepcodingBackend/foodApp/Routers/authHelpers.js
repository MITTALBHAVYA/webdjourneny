function ProtectRoute(req,res,next){
    if(req.cookies.IsLoggedIn){
        next();
    }
    else{
        return res.json({
            message:'Access not allowed'
        })
    }
};

module.exports=ProtectRoute;