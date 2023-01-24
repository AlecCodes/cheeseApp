require('dotenv').config()
const mongoose = require('mongoose')
const DATABASE_URL = process.env.DATABASE_URL

mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

mongoose.connection
    .on("open", ()=> console.log("You are connected to mongoose"))
    .on("close", ()=> console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error))

module.exports = mongoose