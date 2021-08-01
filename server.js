import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import connect from './config/db.js'
import userRoutes from './routes/userRoute.js'
import orderRoutes from './routes/orderRoute.js'

const app = express()
const PORT = process.env.PORT || 7000

dotenv.config() //this loads .env file contents into process.env

app.listen(PORT, ()=>{
    connect()
    console.log(`Server running on port ${PORT}`)
})

/* Imported and custom middleware */
app.use(express.json())
app.use(cors({
    origin : ["http://127.0.0.1:5500"],
    methods : [ 'GET', 'POST', 'PUT', 'DELETE' ],
    allowedHeaders : ['Content-Type', 'Authorization'],
    credentials : true
    // optionsSuccessStatus : 200
}))

app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)


// app.use(connect)

// app.use('/', (req, res, next)=>{
//     console.log(req.headers.authorization)
//     next()
// })
