import mongoose from "mongoose"

const connectdB=async()=>{
    try {
        await mongoose.connect(process.env.mongostring)
        console.log("db connected");
        
    } catch (error) {
        console.log("db error");
        
    }
}

export default connectdB