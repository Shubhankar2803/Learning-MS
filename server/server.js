import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks, stripeWebhook } from './controllers/webhook.js'
import educatorRouter from './routes/educatorRoutes.js'
import { clerkMiddleware } from '@clerk/express'
import connectCloudinary from './configs/cloudinary.js'
import courseRouter from './routes/courseRoutes.js'
import userRouter from './routes/userRoutes.js'

                                             
const app=express()

app.use(cors())
app.use(clerkMiddleware())
//database connection

await connectDB()
await connectCloudinary()


app.get('/',(req,res)=> res.send('Api working'))

app.post('/clerk',express.json(),clerkWebhooks)

app.use('/api/educator',express.json(),educatorRouter)

app.use('/api/course',express.json(),courseRouter)

app.use('/api/user',express.json(),userRouter)

app.post('/stripe',express.raw({type:'application/json'}),stripeWebhook)

                  
const PORT=process.env.PORT ||5000

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})