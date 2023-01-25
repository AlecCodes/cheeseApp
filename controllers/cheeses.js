const Cheese = require('../models/cheese')
const {Router} = require('express')
const router = Router()
const auth = require('../auth')



router.get("/", (req,res)=>{
    res.json({message: "Cheese router"})
})

//INDEX
router.get("/index", auth, async (req,res)=>{
    try{
        //this happens once user is authenticated
        const {username} = req.payload
        res.json(await Cheese.find({username}))
    } catch (error) {
        res.status(400).json(error)
    }
})

//POST route
router.post("/", auth, async(req,res)=>{
    try{
        const {username} = req.payload
        req.body.username = username
        res.json(await Cheese.create(req.body))
    } catch (error){
        res.status(400).json(error)
    }
})
//PUT Route
router.put("/:id", auth, async(req,res) => {
    try{
        const {username} = req.payload
        req.body.username = username
        res.json(await Cheese.findByIdAndUpdate(req.params.id, req.body, {new:true}))
    }catch(error){
        res.status(400).json(error)
    }
})
//DELETE Route
router.delete("/:id", async(req,res)=> {
    try{
        res.json(await Cheese.findByIdAndRemove(req.params.id))
    }catch(error){
        res.status(400).json(error)
    }
})
//SHOW Route
router.get("/:id", async (req,res)=>{
    try{
        res.json(await Cheese.findById(req.params.id))
    }catch(error){
        res.status(400).json(error)
    }
})

module.exports = router