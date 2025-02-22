import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()


// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))
// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'], 
// }))
// app.use(cors())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
}))


app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({extended: true, limit: '16kb'}))
app.use(express.static("public"))
app.use(cookieParser())

// routes import 

import userRouter from "./routes/user.routes.js"
import ngoRouter from "./routes/ngo.routes.js"

// routes declaration 

app.use("/v1/users",userRouter)
app.use("/v1/ngo",ngoRouter)
app.get("/test", (req, res) => {
    res.send("Server is working on 8000!");
  });
  

export { app }