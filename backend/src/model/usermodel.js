let mongoose = require ('mongoose')



let usermodel = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:[true,'bhai y email se phle se  hi account bna hua h ']
    },
    password:String

})
let model = mongoose.model ('users-details-day-13',usermodel)
module.exports = model