const mongoose =require ("mongoose")
const validator=require("validator")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")

const userSchema= new mongoose.Schema({
    firstname:{
        type:String,
        // this is req check without this datbase not allow to insert data
        minLength:5,
        maxLength:8,
        lowercase:true,
    },
    lastname:{
        type:String,
        maxLength:7,
        lowercase:true,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ("Email is Invalid")
            }
            }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error ("Password is not strong")
            }
            }
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender is not valid")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://imgs.search.brave.com/Leoo4q0vBm5ciPBB6qHhs92ZhFt5K8ZmRHIuwGOcO7w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXQuY29t/L3cvZnVsbC8wL2Qv/OC85NDkyLTE5MjB4/MTA4MC1kZXNrdG9w/LWZ1bGwtaGQtaHVs/ay1iYWNrZ3JvdW5k/LmpwZw",
   validator(value){
            if(!validator.isURL(value)){
                throw new Error ("URL is Invalid")
            }
        }
    },
    about:{
        type:String,
        minLength:10,
        // If the user is not entering about data it will add default value
        default:"This is the default value of the user"
    },
    skills:{
        type:[String]
    },
    age:{
        type:Number,
        min:18,
        
    },
    phoneNumber:{
        type:String,
        validate(value){
            if(!validator.isMobilePhone(value,'en-IN')){
throw new Error ("Phone Number is invalid")
            }
        }
    }
},{
    timestamps:true 
});

userSchema.methods.getJWT=async function(){
    const user =this;
  const token= await jwt.sign({_id:user._id},"KHAN@12",{expiresIn:"1d"});

  return token;
}

userSchema.methods.validatePassword=async function (passwordInputByUser){
    const user=this;
    const passwordHash=user.password;

    const isPasswordValid=bcrypt.compare(passwordInputByUser,passwordHash);

    return isPasswordValid;
}
const userModel= mongoose.model("User",userSchema)

module.exports=userModel;