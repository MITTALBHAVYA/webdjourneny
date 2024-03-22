//server creation
//1.http module

const http = require('http');
http.createServer((req,res)=>{
    console.log('request has been made from browser to server')
});

//port number

server.listen(3000,'localhost',()=>{
    console.log('server is listening on port 3000');
});