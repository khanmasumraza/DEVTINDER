const express=require("express");
const userRouter=express.Router()

const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel=require("../models/connectionRequest");

const USER_SAFE_DATA="firstname lastname  photoUrl";
// Get all the pending connection request for the loggedIn user

userRouter.get("/user/requests/received",userAuth,async (req,res)=>{
   try{
    const loggedInUser=req.user;

    const connectionRequest=await ConnectionRequestModel.find({
     toUserId:loggedInUser._id,
     status:"intrested"
}).populate("fromUserId",USER_SAFE_DATA)
// .populate("fromUserId",["firstname","lastname"])
   
res.json({message:"Data fetched succesfully",
  data:connectionRequest})
  }
  catch(err){
    res.status(400).send("ERROR:" + err.message)
  }
})

module.exports=userRouter;