const express=require("express")
const dbConnect=require("./config/database")
const cookieParser=require("cookie-parser")

const app=express();

// middlewaare
app.use(express.json());
app.use(cookieParser());

const authRouter=require("./routes/auth")
const profileRouter=require("./routes/profile")
const requestRouter=require("./routes/request")

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)

// app.delete("/deleteAccount",userAuth,async(req,res)=>{
//   try{
//     console.log(req.user)
//   const user=req.user
//   await User.findByIdAndDelete(user._id)
//   res.send("Account delete succesfully")
// }
// catch(err){
//  res.status(400).send("ERROR: " + err.message)
// }
// });

// app.post("/logout",async(req,res)=>{
// res.cookie("token",null,{ expires: new Date(Date.now())});
// res.send("User logout succesfully")
// });

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
  
