const express=require('express');
const router=express.Router();
const commentcontroller=require("../controller/comments.controller");
router.get('/review_id/:review_id',commentcontroller.GetComments_By_Review_ID);
router.post('/saveComment',commentcontroller.saveUserComment);
module.exports=router;