const express=require("express")

const app= express();

app.use("/user",(req,res)=>{
    res.send("lol")
})


// This will only handle GET call to /user
app.get("/user",(req,res)=>{
    res.send({firstname:"Masum",lastname:"Raza"})
})

app.post("/user",(req,res)=>{
    // Saving data to DB
    res.send("Data successfully save to database")
})

app.delete("/user",(req,res)=>{
    res.send("Deleted succesfully")
})

// This method match all the HTTP method API calls to /test
app.use("/contact",(req,res)=>{
    res.send("This is my contact page")
})

app.listen(3000);
