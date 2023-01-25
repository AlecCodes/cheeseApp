require("dotenv").config()
const jwt = require("jsonwebtoken")
const SECRET = process.env.SECRET

//next points to next thing in middleware
//Convention is authorization header is sent from frontend that has a string called 'bearer'
const auth = async (req, res, next) => {
    //Authorization: 'bearer abcdef'
    try{
    if (req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1]
        const payload = await jwt.verify(token, SECRET)
    }else{
        res.status(400).json({error: "NO AUTH HEADER"})
    }}
    catch(error){
        res.status(400).json(error)
    }
}