const express=require("express")
const dbConnect=require("./config/database")
const User=require("./models/user")

const app=express();

app.post("/signup",async (req,res)=>{
   const user=new User({
    firstName:"Khan",
    lastName:"Masum",
    emailID:"masum@gmail.com",
    password:"khanbhau@124"
   });

try{
  await user.save();
  res.send("user added succesfully") 
}
catch(err){
  res.status(400).send("Reqeust not added")
}

})
dbConnect()

.then(()=>{
    console.log("Database Connection done")
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });

})
.catch(err=>{
console.log("Connection not done")
})
