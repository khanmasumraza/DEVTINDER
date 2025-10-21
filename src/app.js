const express= require ("express")

const app=express();

// This are request handler for different path "/abiut","/home" etc ... 
app.use("/about",(req,res)=>{
    res.end("This is our about pages yes s ..")
})

app.use("/hello",(req,res)=>{
    res.end("This is our express js server")
})
app.listen(8888,()=>{
    console.log("Server is running")
})