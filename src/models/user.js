const mongoose =require ("mongoose")

const userSchema= new mongoose.Schema({
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    emailId:{
        type:String
    },
    password:{
        type:String
    },
    gender:{
        type:String
    }
});userSchema

const userModel= mongoose.model("User",userSchema)

module.exports=userModel;