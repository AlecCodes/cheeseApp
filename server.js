const express = require('express')
const app = express();
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config();
const PORT = process.env.PORT || 3001
const DATABASE_URL = process.env.DATABASE_URL

//MIDDLEWARE
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

////////////////////////////////////////////////
//MONGOOSE CONNECTION
////////////////////////////////////////////////
const mongoose = require('mongoose')

mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

mongoose.connection
    .on("open", ()=> console.log("You are connected to mongoose"))
    .on("close", ()=> console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error))


////////////////////////////////////////////////////////////////
//Schema
////////////////////////////////////////////////////////////////
const CheeseSchema = new mongoose.Schema({
    name: String,
    image: String,
    country: String
})
//document
const Cheese = mongoose.model("cheese", CheeseSchema)


//////////////////////////////////////////////////////////////
//ROUTES
//////////////////////////////////////////////////////////////
app.get("/", (req,res)=>{
    res.json({message: "Hello World"})
})

//INDEX
app.get("/cheeses", async (req,res)=>{
    try{
        res.json(await Cheese.find({}))
    } catch (error) {
        res.status(400).json(error)
    }
})
//POST route
app.post("/cheeses", async(req,res)=>{
    try{
        req.body.isFunny = req.body.isFunny === 'on' ? true : false;
        res.json(await Cheese.create(req.body))
    } catch (error){
        res.status(400).json(error)
    }
})
//PUT Route
app.put("/cheeses/:id", async(req,res) => {
    try{
        res.json(await Cheese.findByIdAndUpdate(req.params.id, req.body, {new:true}))
    }catch(error){
        res.status(400).json(error)
    }
})
//DELETE Route
app.delete("/cheeses/:id", async(req,res)=> {
    try{
        res.json(await Cheese.findByIdAndRemove(req.params.id))
    }catch(error){
        res.status(400).json(error)
    }
})
//SHOW Route
app.get("/cheeses/:id", async (req,res)=>{
    try{
        res.json(await Cheese.findById(req.params.id))
    }catch(error){
        res.status(400).json(error)
    }
})

//listener
app.listen(PORT, () => console.log(`LISTENING ON ${PORT}`))

