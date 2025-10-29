const express=require("express")
const dbConnect=require("./config/database")
const User=require("./models/user");

const app=express();

// middlewaare
app.use(express.json());

app.post("/signup",async (req,res)=>{

   const user=new User(req.body);

try{
  await user.save();
  res.send("user added succesfully") 
}
catch(err){
  res.status(400).send("Reqeust not added")
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
  
