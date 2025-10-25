// const express=require("express")

// const { use } = require("react")

// const app=express();

const khan=(req,res)=>{
    res.send("Home page access")
}
const dummy=(req,res,next)=>{
    const token="xyz"
    const ifMatch= token==="xyz"

    if(!ifMatch==="token"){
        res.status(401).send("Not acess otherwise request")
    }
    else{
     next();
    }
}

const user=(req,res,next)=>{
    res.send("all acess data")
    next();
}

const pass=(req,res,next)=>{
    res.send("Pass data also")
}

module.exports={
khan,dummy,user,pass
};

