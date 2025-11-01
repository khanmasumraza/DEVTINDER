const express=require("express")
const dbConnect=require("./config/database")
const User=require("./models/user");
const validateSignUpData=require("./utils/validation")
const bcrypt=require("bcrypt")

const app=express();

// middlewaare
app.use(express.json());

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

const isPasswordValid= await bcrypt.compare(password,user.password)

if(isPasswordValid){
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
// get user by mail

app.get("/user",async(req,res)=>{
  const userEmail=req.body.emailId;

  try{
const user= await User.find({emailId:userEmail})

if(user.length===0){
  res.status(404).send("User not found")
}
else{
  res.send(user)
}
  }
  catch(err){
res.status(404).send("Something went wrong")
  }
})
// Feed API-GET/feed -get all the users from the database

app.get("/feed",async(req,res)=>{

  // const user=  await User.findOne({emailId:"rohit12@gmail.com"})
  // res.send(user)
  try{
const users= await User.find({})
  res.send(users)
  }
  catch (err){
   res.status(404).send("Something went wrong"); 
  }
})

// delete a user from the database

app.delete("/user",async (req,res)=>{
  const userId=req.body.userId;
  try{
   const user= await User.findByIdAndDelete(userId)
   res.send("User delete succesfully")
  }
  catch (err){
    res.status(404).send("Something went wrong"); 
  }
})

// update a data to database

app.patch("/user/:userId",async(req,res)=>{
  const userId=req.params?.userId;
  const data=req.body;

  try {
  //   const ALLOWED_UPDATES = [
  //     "photoUrl",
  //     "about",
  //     "gender",
  //     "age",
  //     "skills",
  //   ];

  //   const isUpdateAllowed = Object.keys(data).every((k) =>
  //     ALLOWED_UPDATES.includes(k)
  //   );

  //   if (!isUpdateAllowed) {
  //     throw new Error("Update not allowed");
  //   }

    // if(data.skills.length>10){
    //   throw new Error("Skill size cannot be greater than 10")
    // }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });

    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("UPDATE FAILED: " + err.message);
  }
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
  
