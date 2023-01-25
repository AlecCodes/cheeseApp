const Cheese = require('../models/cheese')
const {Router} = require('express')
const router = Router()

router.get("/", (req,res)=>{
    res.json({message: "Cheese router"})
})

//INDEX
router.get("/index", async (req,res)=>{
    try{
        res.json(await Cheese.find({}))
    } catch (error) {
        res.status(400).json(error)
    }
})

//POST route
router.post("/", async(req,res)=>{
    try{
        res.json(await Cheese.create(req.body))
    } catch (error){
        res.status(400).json(error)
    }
})
//PUT Route
router.put("/:id", async(req,res) => {
    try{
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