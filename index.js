const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const ap=express();
ap.use(express.json());

var path = require('path');
ap.use("/images", express.static(path.join('./Uploads')));
const port=process.env.port|| 4000;
ap.use(bodyparser.urlencoded({extended:false}));
ap.use(bodyparser.json());
ap.get('/download',function(req,res,next){
    res.download(req,function(err){
        if(err){
            next(err);
        }
    })
})
const userroutes=require('./src/router/user_regis_list.router');
ap.use('/api/user-regis-list',userroutes);
const viewrouter=require("./src/router/review.router");
ap.use("/api/review",viewrouter);
const commentroutes=require('./src/router/comments.router');
ap.use("/api/comment",commentroutes);
ap.listen(port,()=>{
    console.log('The server is running at the port of',{port});
})