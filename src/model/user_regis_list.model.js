const data_access=require('../../db.configration.eview/db.config.review');
var User_model=function(userregistrationdetails){
    this.U_ID=userregistrationdetails.U_ID;
    this.U_Name=userregistrationdetails.U_Name;
    this.U_Contact=userregistrationdetails.U_Contact;
    this.U_Email=userregistrationdetails.U_Email;
    this.U_Pass=userregistrationdetails.U_Pass;
    this.U_RePass=userregistrationdetails.U_RePass;
    this.about=userregistrationdetails.about;
    this.U_Image=userregistrationdetails.U_Image;
}
User_model.getUserRegistrationList=(result)=>{
    data_access.query('Select * from userregistrationdetails',(err,res)=>{
        if(err)
        {
            console.log("Data Not Found",err);
            result(null,res);
        }
        else{
            console.log(res);
            result(null,res);
        }
    })
}
User_model.getUser_List_By_Name=(name,result)=>{
    data_access.query('select * from userregistrationdetails where U_Name=?',name,(err,res)=>{
        if(err){
            console.log(err);
            result(null,res);
        }else{
            console.log(res);
            result(null,res);
        }
    })
}
User_model.getUserRegistrationListBy_U_ID=(userid,result)=>{
    data_access.query("Select * from userregistrationdetails where U_ID=?",userid,(err,res)=>{
       if(err){
        console.log(" Data Not Found",err);
        result(null,res);
       }
       else{
        console.log(res);
        result(null,res);
       }
    })
}
User_model.insertUserRegisData=(userlistdata,result)=>{
    data_access.query('insert into userregistrationdetails set ?',userlistdata,(err,res)=>{
        if(err){
            console.log("Invalid Entry",err);
            result(null,res);
        }else{
            console.log(res);
            result(null,res);
        }
    })
}
User_model.getUser_List_By_Email=(email,result)=>{
    data_access.query("select * from userregistrationdetails where U_Email=?",email,(err,res)=>{
        if(err){
            console.log("Data Not Found");
            result(null,res);
        }else{
            console.log(res);
            result(null,res);
        }
    })
}
User_model.loginUserBy_Email_Pass=(email,pass,result)=>{
    data_access.query("select * from userregistrationdetails where U_Email=? and U_Pass=?",[email,pass],(err,res)=>{
        if(err){
            console.log(err);
            result(null,res);
        }
        else{
            console.log(res);
            result(null,res);
        }
    })
}
User_model.updateUserDetailsbyID=(id,usrreq,result)=>{
    data_access.query('update userregistrationdetails set U_Name=?, U_Email=?,U_Contact=?,about=? where U_ID=?',[usrreq.U_Name,usrreq.U_Email,usrreq.U_Contact,usrreq.about,id],(err,res)=>{
        if(err) {
            console.log(err);
            result(null,res);
        }else{
            console.log(res);
            result(null,res);
        }   
    })
}
User_model.changePasswordbyID=(id,usrreq,result)=>{
    data_access.query('update userregistrationdetails set U_Pass=?,U_RePass=? where U_ID=?',[usrreq.U_Pass,usrreq.U_RePass,id],(err,res)=>{
        if(err){
            console.log(err);
            result(null,res);
        }else{
            console.log(res);
            result(err,res);
        }
    })
}
User_model.getRandomUserDetails=(result)=>{
    data_access.query('select * from userregistrationdetails order by rand() limit 1;',(err,res)=>{
        if(err){
            console.log(err);
            result(null,res);
        }else{
            console.log(res);
            result(null,res);
        }
    })
}
User_model.getRandomUsers_Details=(id,result)=>{
    data_access.query('select * from userregistrationdetails WHERE U_ID!=? order by rand() ;',id,(err,res)=>{
        if(err){
            console.log(err);
            result(null,res);
        }else{
            console.log(res);
            result(null,res);
        }
    })
}
User_model.DeleteUserByID=(id,result)=>{
    data_access.query('delete from userregistrationdetails where U_ID=?',id,(err,res)=>{
        if(err){
            console.log(err);
            result(null,res);
        }else{
            console.log(res);
            result(null,res);
        }
    })
}
User_model.saveImage=(id,usr,result)=>{
   data_access.query('update userregistrationdetails set U_Image=? where U_ID=?',[usr.U_Image,id],(err,res)=>{
    if(err){
        console.log(err);
        result(null,res);
    }else{
        console.log(res);
        result(null,res);
    }
   })
}
module.exports=User_model;