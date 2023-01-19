const commentde=require("../model/comments.model");

exports.saveUserComment=(req,res)=>{
    const userreview=new commentde(req.body);
    commentde.saveComment(userreview,(err,comment)=>{
        if(err){
            console.log("Invalid data",err);
            res.send(err);
        }else{
            console.log(comment);
            res.json({Message:"Success",UserComment:comment});
        }
    })
}
exports.GetComments_By_Review_ID=(req,res)=>{
    commentde.getcommentby_reviewid(req.params.review_id,(err,comm)=>{
        if(err){
            console.log("Invalid data",err);
            res.send(err);
        }else{
            console.log(comm);
            res.json({Message:"Success",UserComent:comm});
        }
    })
}