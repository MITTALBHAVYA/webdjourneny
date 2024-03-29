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
app.get('/user',(req,res)=>{
    console.log(req.query);
    res.send(users);

})

app.post('/user',(req,res)=>{
    console.log(req.body);
    users=req.body;
    res.json({
        message:"data received successfully",
        user:req.body
    })
})

//update -> patch
app.patch('/user',(req,res)=>{
    console.log('req.body->',req.body);
    let dataToBeUpdated = req.body;
    for(key in dataToBeUpdated){
        users[key]=dataToBeUpdated[key];
    }
    res.json({
        message:"data updated successfully"
    })
});
//to delete a data
app.delete('/user',(req,res)=>{
    users={};
    res.json({
        message:"data has been deleted"
    });
});

//params
app.get('/user/:userName',(req,res)=>{
    console.log(req.params.userName);
    console.log(req.params);
    res.send("user id is received");
})