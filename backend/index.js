
import express from "express"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import ConnectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import CategoryRoutes from "./routes/categoryRoutes.js"
dotenv.config()
const port = process.env.PORT || 5000
ConnectDB()
const app =express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api/users',userRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/category',CategoryRoutes)
app.listen(port,()=>console.log(`Server listen to the port ${port}`))
