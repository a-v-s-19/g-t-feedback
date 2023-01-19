const data_access=require('../../db.configration.eview/db.config.review');
var Comment=function(comments){
    this.com_id=comments.com_id;
    this.user_id=comments.user_id;
    this.review_id=comments.review_id;
    this.comm=comments.comm;
}
Comment.getreview=(result)=>{
    data_access.query('select * from comments',(err,res)=>{
        if(err){
            console.log(err);
            result(null,res);
    }else{
        console.log(res);
        result(null,res);
    }
    })
}
Comment.saveComment=(data,result)=>{
    data_access.query("insert into comments set ?",data,(err,res)=>{
        if(err){
            console.log(err);
            result(null,res);
    }else{
        console.log(res);
        result(null,res);
    }
    })
}
Comment.getcommentby_reviewid=(id,result)=>{
    data_access.query('SELECT * from comments as c join reviewdata as r on c.review_id=r.R_ID WHERE c.review_id=?;',id,(err,res)=>{
        if(err){
            console.log(err);
            result(null,res);
    }else{
        console.log(res);
        result(null,res);
    }
    })
}
module.exports=Comment;