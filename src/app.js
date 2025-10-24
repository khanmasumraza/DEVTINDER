const express=require("express")

const app=express();

// app.use("/rputer",rh1,rh2,[rh3],rh4,rh5)

app.use("/user",[(req,res,next)=>{
console.log("This is route handler 1")
next();
// res.send(" Response")
},

(req,res,next) =>{
  console.log("Route handling 2 ")
  // res.send("Response 2")
  next();
},
(req,res,next) =>{
  console.log("Route handling 3 ")
  // res.send("Response 3")
  next();
},

(req,res,next) =>{
  console.log("Route handling 4 ")
  // res.send("Response 4")
  next();
},
(req,res,next) =>{
  console.log("Route handling 5 ")
  res.send("Response 5")
}
]);

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});