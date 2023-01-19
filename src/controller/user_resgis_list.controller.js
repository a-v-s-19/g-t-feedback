const { changePasswordbyID } = require('../model/user_regis_list.model');
const userlist=require('../model/user_regis_list.model');//data imported from (user_regis_list.model.js) file

const fs = require('fs-extra');
const mime = require('mime');
const uid = require('uuid');
const sizeOf=require('image-size');
exports.getImage=(req,res)=>{
    // to declare some path to store your converted image
  var decodedImg = decodeBase64Image(req.body.img);
  var imageBuffer = decodedImg.data;//exact bas64
  var type = decodedImg.type;//image extansion
  var extension = mime.getExtension(type);
  var fileName =  uid.v1()+"." + extension;
  try{
        fs.writeFileSync("./Uploads/" + fileName, imageBuffer, 'utf8');
        res.json({Message :'Success',path:fileName});
     }
  catch(err){
     console.error(err)
     res.json({Message :err});
  }
};


function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer.from(matches[2].split(';base64,').pop(), 'base64');
  return response;
}



exports.User_Registration_List_By_Name=(req,res)=>{
    userlist.getUser_List_By_Name(req.params.U_Name,(err,UserList)=>{
       if(err){
        console.log(err)
        res.send(err);
       }else{
        console.log(UserList);
        res.json({Message:"Success",UserResponse:UserList});
       }
    })
}
exports.user_registration_list=(req,res)=>{
    userlist.getUserRegistrationList((err,user)=>{
        if(err){
            console.log("Invalid data",err);
        }
        else{
            console.log(user);
            res.send(user);
        }
    })
}
exports.user_registration_list_by_U_ID=(req,res)=>{
    userlist.getUserRegistrationListBy_U_ID(req.params.U_ID,(err,user)=>{
        if(err){
            console.log("Invalid",err);
        }else{
            console.log("data Found",user);
            res.json({Message:"Success",UserList:user});
        }
    })
}
exports.saveUserRegisData=(req,res)=>{
    const userrequest=new userlist(req.body);
    userlist.insertUserRegisData(userrequest,(err,user)=>{
        if(err){
            console.log('Invalid data',err);
            res.send(err);
        }
        else{
            res.json({Message:'Success',User:user});
        }
    })
}
exports.Login_User_By_Email_Pass=(req,res)=>{
    userlist.loginUserBy_Email_Pass(req.params.U_Email,req.params.U_Pass,(err,loginresponse)=>{
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            console.log(loginresponse);
            res.json({Message:"Success",LoginResponse:loginresponse})
        }
    })
}
exports.User_Registration_List_By_Email=(req,res)=>{
    userlist.getUser_List_By_Email(req.params.U_Email,(err,userlistbyemail)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(userlistbyemail);
            res.json({Message:"Success",UserList:userlistbyemail});
        }
    })
}
exports.UpdateUserDetailsBy_ID=(req,res)=>{
    const userreq=new userlist({
        U_Name:req.body.U_Name,
        U_Email:req.body.U_Email,
        U_Contact:req.body.U_Contact,
        about:req.body.about
    });
    userlist.updateUserDetailsbyID(req.params.U_ID,userreq,(err,updateResponse)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(updateResponse);
            res.json({Message:"Success",UpdateResponse:updateResponse});
        }
    })
}
exports.ChangePasswordBy_ID=(req,res)=>{
    const userreq=new userlist(req.body);
    userlist.changePasswordbyID(req.params.U_ID,userreq,(err,passResponse)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(passResponse);
            res.json({Message:"Success",PasswordResponse:passResponse});
        }
    })
}
exports.getRandomUser=(req,res)=>{
    userlist.getRandomUserDetails((err,Randomres)=>{
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
           console.log(Randomres);
           res.json({Message:'Success',RandomResponse:Randomres});
        }
    })
}
exports.getRandom_Users=(req,res)=>{
    userlist.getRandomUsers_Details(req.params.U_ID,(err,Randomres)=>{
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
           console.log(Randomres);
           res.json({Message:'Success',Random_Response:Randomres});
        }
    })
}
exports.DeleteUser_By_ID=(req,res)=>{
    userlist.DeleteUserByID(req.params.U_ID,(err,deleteUser)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
             console.log(deleteUser);
             res.json({Message:"Success",DeleteUser:deleteUser});
        }
    })
}
exports.saveUserImage=(req,res)=>{
    const usr=new userlist({
        U_Image:req.body.U_Image
    });
    userlist.saveImage(req.params.U_ID,usr,(err,ImageRes)=>{
        if(err){
            console.log(err);
        }else{
            console.log({Message:"Success",ImageResponse:ImageRes})
            res.json({Message:"Success",ImageResponse:ImageRes})
        }
    })
}
