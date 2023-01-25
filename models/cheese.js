const {Schema, model} = require('mongoose')

const CheeseSchema = new Schema({
    username: {type: String, unique: true},
    name: String,
    image: String,
    country: String
})
//document
const Cheese = model("cheese", CheeseSchema)

module.exports = Cheese;