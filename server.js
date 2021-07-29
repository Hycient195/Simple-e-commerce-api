import express from 'express'
import dotenv from 'dotenv'

import connect from './config/db.js'
import userRoutes from './routes/route.js'

const app = express()
const PORT = process.env.PORT || 6001

dotenv.config() //this loads .env file contents into process.env

app.listen(PORT, ()=>{
    connect()
    console.log(`Server running on port ${PORT}`)
})

/* Imported and custom middleware */
app.use(express.json())
app.use('/api/users', userRoutes)
// app.get('/', (req, res)=>{
//     res.send('Home page')
// })

// app.use(connect)

// app.use('/', (req, res, next)=>{
//     console.log(req.headers.authorization)
//     next()
// })
