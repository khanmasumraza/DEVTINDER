const mongoose =require ("mongoose")

const userSchema= new mongoose.Schema({
    firstname:{
        type:String,
        // this is req check without this datbase not allow to insert data
        required:true,
        minLength:5,
        maxLength:8,
    },
    lastname:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        // by using unique you cannot send same email to databse it throw error
        unique:true,
        // by lowercase email will be store in lowercase
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
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
        default:"https://imgs.search.brave.com/3SWuWnQgFhsq940CBhII9PGkgIV5tXJjcCca6NOApjE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMy/NzU5MjUwNi92ZWN0/b3IvZGVmYXVsdC1h/dmF0YXItcGhvdG8t/cGxhY2Vob2xkZXIt/aWNvbi1ncmV5LXBy/b2ZpbGUtcGljdHVy/ZS1idXNpbmVzcy1t/YW4uanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPUJwUjBGVmFF/YTVGMjRHSXc3Szhu/TVdpaUdtYmI4cW1o/ZmtwWGNwMWRoUWc9"
    },
    about:{
        type:String,
        // If the user is not entering about data it will add default value
        default:"This is the default value of the user"
    },
    skills:{
        type:[String]
    },
    age:{
        type:Number,
        min:18,
    }
},{
    timestamps:true 
});

const userModel= mongoose.model("User",userSchema)

module.exports=userModel;