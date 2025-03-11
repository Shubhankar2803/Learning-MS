import mongoose from 'mongoose'

 

const connectDB=async()=>{

    mongoose.connection.on('connected',()=>console.log('Database connectted'))

await mongoose.connect(`${process.env.MONGODB_URI}/lms`)
}
export default connectDB