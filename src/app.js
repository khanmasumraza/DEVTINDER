const express=require("express")

const app=express();

const { adminAuth,userAuth} = require("./middlewares/auth");


//Handle Auth Middleware for all GET POST ,....request
app.use("/admin",adminAuth)

app.post("/user/login",(req,res)=>{
  res.send("User login succesfully")
})

app.get("/user",userAuth,(req,res)=>{
  res.send("User data send")
})
app.get("/admin/getAllData",(req,res)=>{
 res.send("All data send");
})

app.get("/admin/DeleteUser",(req,res)=>{
   res.send("Delete the User")
})


app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});