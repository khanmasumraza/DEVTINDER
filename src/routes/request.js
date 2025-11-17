const express=require("express")
const requestRouter=express.Router();
const {userAuth}=require("../middlewares/auth");
const ConnectionRequestModel=require("../models/connectionRequest")
const User=require("../models/user");

requestRouter.post("/request/send/:status/:toUserId",userAuth,async (req,res)=>{
  try{
    const fromUserId=req.user._id;
const toUserId=req.params.toUserId;
const status=req.params.status;

    const allowedStatus=["ignored","intrested"];
if(!allowedStatus.includes(status)){
      return res.status(400).json({message:"Invalid status type:" +status})
}

    const toUser=await User.findById(toUserId)
if(!toUser){
  return res.status(400).json({message:"User not found!"})
}
    // if there is  an existing Connection Request

    const existingConnectionRequest= await  ConnectionRequestModel.findOne({
  $or:[
    {fromUserId,toUserId},
        {fromUserId:toUserId,toUserId:fromUserId}
      ]
});

if(existingConnectionRequest){
  return res.status(400).send({message:"Connection request already exists"})
}
    const connectionRequest=new ConnectionRequestModel({
  fromUserId,toUserId,status
})

const data=await connectionRequest.save();

res.json({
      message:req.user.firstname + " is " +status+ " in "+toUser.firstname,
  data
    });
  }
  catch(err){
    res.status(400).send("ERROR:"+ err.message)
  }

})

requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
  
  try{

    // validating the status

    const loggedInUser=req.user;
    const {status,requestId}=req.params;

    const allowedStatus=["accepted","rejected"]
    if(!allowedStatus.includes(status)){
      return res.status(400).json({
        message:"status is Invalid"
      })
    }

    const connectionRequest=await ConnectionRequestModel.findOne({
      _id:requestId,
      toUserId:loggedInUser._id,
      status:"intrested",
    })
    if(!connectionRequest){
      res.status(400).json({message:"Connection request not found"})
    }

    connectionRequest.status=status;

    const data= await connectionRequest.save();

    res.json({message:"Connection request "+status},data)
  }
  catch(err){
    res.status(400).send("ERROR"+err.message)
  }
})

module.exports=requestRouter;