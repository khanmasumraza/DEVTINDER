const express=require("express")
const requestRouter=express.Router();

const {userAuth}=require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest",userAuth,async (req,res)=>{

  // Reading

  const user=req.user;
  // Sending Connection request
  console.log("Sending a connection reques")

  res.send(user.lastname +  " send the connection request")
})

module.exports=requestRouter;