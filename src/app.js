const express=require("express")

const app= express();

app.get("/user/:userId",(req,res)=>{
    console.log(req.params);
    res.send({firstname:"Masum",lastname:"Raza"})
})

app.listen(3000);
