let mongoose = require('mongoose')
require('dotenv').config()


let connecttodb = ()=> {
    mongoose.connect(process.env.MONGO_URI)
    console.log('connected to db brother')
}
module.exports = connecttodb