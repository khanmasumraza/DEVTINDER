const express=require("express")
const dbConnect=require("./config/database")
const User=require("./models/user");
const validateSignUpData=require("./utils/validation")
const bcrypt=require("bcrypt")
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken")
const {userAuth}=require("./middlewares/auth");


const app=express();

// middlewaare
app.use(express.json());
app.use(cookieParser());

app.post("/signup",async (req,res)=>{

  
  try{

  // Validation of the data
  validateSignUpData(req)

  // Encrypt the password
  const {firstname,lastname,emailId,password}=req.body;

  const passwordHash= await bcrypt.hash(password,10)
  console.log(passwordHash);

   const user=new User({
    firstname,lastname,emailId,password:passwordHash,
   });
  await user.save();
  res.send("user added succesfully") 
}
catch(err){
  res.status(400).send("ERROR: " + err.message)
}

})

app.post("/login",async(req,res)=>{

  try{
const {emailId,password}=req.body;

const user=await User.findOne({emailId})

if(!user){
  throw new Error("Invalid credientals")
}

const isPasswordValid= await user.validatePassword(password)

if(isPasswordValid){

  const token=await user.getJWT();

res.cookie("token",token,{expires:new Date(Date.now()+8*3600000),});

  res.send("User Login Succesfully")
}
else{
  throw new Error("Invalid credientals")
}
  }
  
 catch(err){
 res.status(400).send("ERROR: " + err.message)
}
  
})

app.get("/profile",userAuth,async(req,res)=>{

  try{
    const user=req.user;
    res.send(user);
  }
 catch(err){
 res.status(400).send("ERROR: " + err.message)
}
})

app.post("/sendConnectionRequest",userAuth,async (req,res)=>{

  // Reading

  const user=req.user;
  // Sending Connection request
  console.log("Sending a connection reques")

  res.send(user.lastname +  " send the connection request")
})

app.delete("/deleteAccount",userAuth,async(req,res)=>{
  try{
    console.log(req.user)
  const user=req.user
  await User.findByIdAndDelete(user._id)
  res.send("Account delete succesfully")
}
catch(err){
 res.status(400).send("ERROR: " + err.message)
}
});

app.post("/logout",async(req,res)=>{
res.cookie("token",null,{ expires: new Date(Date.now())});
res.send("User logout succesfully")
});
dbConnect()

.then(()=>{
    console.log("Database Connection done")
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    })
  })
  .catch(err=>{
    console.log("Connection not done")
  })
  
