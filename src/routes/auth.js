const express=require("express")
const authRouter=express.Router()

const {validateSignUpData}=require("../utils/validation")
const User=require("../models/user");
const bcrypt=require("bcrypt")

authRouter.post("/signup",async (req,res)=>{
  try{

  validateSignUpData(req)

  const {firstname,lastname,emailId,password}=req.body;

  const passwordHash= await bcrypt.hash(password,10)
  console.log(passwordHash);

   const user=new User({
    firstname,lastname,emailId,password:passwordHash,
   });
 const savedUser= await user.save();

 const token=await savedUser.getJWT();

res.cookie("token",token,{
  expires:new Date(Date.now()+8*3600000)
});

  res.json({message:"user added succesfully",data:savedUser}) 
}
catch(err){
  res.status(400).send("ERROR: " + err.message)
}

})

authRouter.post("/login",async(req,res)=>{

  try{
const {emailId,password}=req.body;

const user=await User.findOne({emailId})

if(!user){
  throw new Error("Invalid credientals")
}

const isPasswordValid= await user.validatePassword(password)

if(isPasswordValid){

  const token=await user.getJWT();

res.cookie("token",token,{
  expires:new Date(Date.now()+8*3600000)
});

  res.send(user)
}
else{
  throw new Error("Invalid credientals")
}
  }
  
 catch(err){
 res.status(400).send("ERROR: " + err.message)
}
  
})

authRouter.post("/logout",async(req,res)=>{
  res.cookie("token",null,{
    expires:new Date(Date.now()),
  })
  res.send("Logout Succesfull !!")
})
module.exports=authRouter;