const mongoose=require ("mongoose")

const dbConnect= async () =>{
await mongoose.connect("mongodb+srv://MasumRaza89:Masumdatasecure23@masumraza.qjpiwch.mongodb.net/devTinder")
}

module.exports=dbConnect;