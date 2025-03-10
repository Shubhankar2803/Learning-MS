import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhook.js'

                                             
const app=express()

app.use(cors())
//database connection

await connectDB()

app.get('/',(req,res)=> res.send('Working api'))
app.post('/clerk',express.json(),clerkWebhooks)

                  
const PORT=process.env.PORT ||5000

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})