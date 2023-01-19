const data_access=require('../../db.configration.eview/db.config.review');
var Review=function(reviewdata){
    this.R_ID=reviewdata.R_ID;
    this.TextReview=reviewdata.TextReview;
    this.u_id=reviewdata.u_id;
    this.Product_Name=reviewdata.Product_Name;
    this.Review_Title=reviewdata.Review_Title;
    this.im1=reviewdata.im1;
    this.im2=reviewdata.im2;
    this.im3=reviewdata.im3;
    this.im4=reviewdata.im4;
    this.im5=reviewdata.im5;
    this.im6=reviewdata.im6;
    this.buy_now=reviewdata.buy_now;
}
Review.getreview=(result)=>{
    data_access.query('select * from reviewdata',(err,res)=>{
        if(err){
            console.log(err);
            result(null,res);
    }else{
        console.log(res);
        result(null,res);
    }
    })
}
Review.getreviewByRID=(id,result)=>{
    data_access.query('select * from reviewdata where R_ID=?',id,(err,res)=>{
        if(err){
            console.log(err);
            result(null,res);
    }else{
        console.log(res);
        result(null,res);
    }
    })
}
Review.saveReview=(review,result)=>{
    data_access.query("insert into reviewdata set ?",review,(err,res)=>{
        if(err){
            console.log(err);
            result(null,res);
        }else{
            console.log(res);
            result(null,res);
        }
    })
}
Review.getReviewByID=(id,result)=>{
    data_access.query("Select re.im1,re.im2,re.im3,re.im4,re.im5,re.im6,re.buy_now,re.R_ID,re.Product_Name,re.Review_Title,re.TextReview,ur.U_Name from reviewdata as re join userregistrationdetails as ur on re.u_id=ur.U_ID where ur.U_ID=?",id,(err,res)=>{
        if(err){
            console.log(err);
            result(null,res);
        }else{
            console.log(res);
            result(null,res);
        }
    })
}
Review.CountReviewsbyID=(id,result)=>{
    data_access.query('select COUNT(TextReview) as p from reviewdata where u_id=?',id,(err,res)=>{
        if(err){
            console.log(err);
            result(null,res);
        }else{
            console.log(res);
            result(null,res);
        }
    })
}
Review.reviewbyP_Name=(name,result)=>{
    data_access.query('select * from reviewdata where Product_Name=?',name,(err,res)=>{
        if(err){
            console.log(err);
            result(null,res);
        }else{
            console.log(res);
            result(null,res);
        }
    })
}
module.exports=Review;