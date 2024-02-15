import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './Routes/posts.js'
import userRoutes from './Routes/users.js'
import dotenv from 'dotenv'
const app=express()

app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))
app.use(cors())
dotenv.config()
app.use('/posts',postRoutes)
app.use('/user',userRoutes)





const CONNECTION_URL = 'mongodb+srv://aman04anshul:amanbhai@cluster0.4jfrjfj.mongodb.net/';
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false // Adding useFindAndModify option to avoid deprecation warning
})
  .then(() => app.listen(PORT, () => console.log('Server running on port', PORT)))
  .catch((error) => console.log('Connection error:', error));
