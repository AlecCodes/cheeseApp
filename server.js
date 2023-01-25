//JWWTTTTT
const express = require('express')
const app = express();
const morgan = require('morgan')
const cors = require('cors')
const corsOptions = require('./config/cors')
const mongoose = require('./db/connection')
require('dotenv').config();
const PORT = process.env.PORT || 3001
const {DATABASE_URL, NODE_ENV} = process.env
const AuthRouter = require('./controllers/user')
const CheeseRouter = require('./controllers/cheeses')


//MIDDLEWARE
app.use(express.json())
app.use(morgan('dev'))
// app.use(NODE_ENV === 'production' ? cors(corsOptions) : cors())
app.use('/auth', AuthRouter)
app.use('/cheeses',CheeseRouter)
//app.use(express.state("public"))


//listener
app.listen(PORT, () => console.log(`LISTENING ON ${PORT}`))

