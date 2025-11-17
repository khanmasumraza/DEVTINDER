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
   
res.send(connectionRequest)
  }
  catch(err){
    res.status(400).send("ERROR:" + err.message)
  }
})

userRouter.get("/user/connections",userAuth,async(req,res)=>{
  try{
const loggedInUser=req.user;

const connectionRequest= await ConnectionRequestModel.find({
  $or:[
    {toUserId:loggedInUser._id,status:"accepted"},
    {fromUserId:loggedInUser._id,status:"accepted"}
  ],
}).populate("fromUserId",USER_SAFE_DATA)
.populate("toUserId",USER_SAFE_DATA)

console.log(connectionRequest)

const data=connectionRequest.map((row)=>{
  if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
    return row.toUserId;
  }
  return row.fromUserId});

res.json({data})
  }
  catch(err){
    res.status(400).send({message:err.message});
  }
})


module.exports=userRouter;