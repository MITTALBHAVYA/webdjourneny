const express = require('express');
const app = express();
app.use(express.json());
app.listen(3000);

let users=[
    { 
        'id':1,
        'name':"Bhavya"
    },
    { 
        'id':2,
        'name':"Mittal"
    },
    { 
        'id':3,
        'name':"Kavya"
    }
];

//mini app banayenge

const userRouter = express.Router();
const authRouter = express.Router();
app.use('/user',userRouter);
app.use('/auth',authRouter);

userRouter
.route('/')
.get(getUser)
.post(postUser)
.patch(updateUser)
.delete(deleteUser);

userRouter
.route('/:id')
.get(getUserById);

authRouter
.route('/signup')
.get(middleware,getSignUp)
.post(postSignUp);

function middleware(req,res,next){
    console.log("middleware executed");
    next();
}
function getUser(req,res){
    res.send(users);
};

function postUser(req,res){
    console.log(req.body);
    users=req.body;
    res.json({
        message:"data received successfully",
        user:req.body
    })
};

function updateUser(req,res){
    console.log('req.body->',req.body);
    let dataToBeUpdated = req.body;
    for(key in dataToBeUpdated){
        users[key]=dataToBeUpdated[key];
    }
    res.json({
        message:"data updated successfully"
    })
};

function deleteUser(req,res){
    users={};
    res.json({
        message:"data has been deleted"
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

function getSignUp(req,res){
    console.log("getSignUp called");
    res.sendFile('public/index.html',{root: __dirname});
}

function postSignUp(req,res){
    let obj = req.body
     console.log("backend",obj)
    res.json({
        message:"user signed up",
        data:obj
    });
}