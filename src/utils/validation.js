const validator=require("validator")

const validateSignUpData=(req)=>{

const {firstname,lastname,emailId,password} =req.body;

if(!firstname || !lastname){
    throw new Error ("Please Enter Name")
}
else if (!validator.isEmail(emailId)){
    throw new Error ("Email is not valid")
}
else if (!validator.isStrongPassword(password)){
    throw new Error ("Enter strong password")
}
}

module.exports=validateSignUpData;