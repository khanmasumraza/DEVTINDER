const express=require("express")

const app=express();

app.use("/",(err,req,res,next)=>{
if(err){
  res.status(500).send("Something went wrong")
}
});

app.use("/getUserData",(req,res)=>{
  // Logic of  DB call  and get user data
// try{
 throw new Error("anaanajkl")
 res.send("User data send")
// }
// catch(err){
//  res.status(500).send("Some error Contact Support Team")
// }
});


app.use("/",(err,req,res,next)=>{
if(err){
  res.status(500).send("Something went wrong")
}
});


app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});