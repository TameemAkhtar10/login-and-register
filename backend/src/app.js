let express = require ('express')
let path = require ('path')
let app = express()
let cors = require('cors')
app.use(express.static('./public'))
let authrouter = require('./router/authroutes')
app.use(cors({
     origin: 'http://localhost:5173', 
    credentials: true
}))
app.use(express.json())
app.use('/api/auth',authrouter)
app.use('*name',(req,res)=> {
    res.sendFile(path.join(__dirname,'..','/public/index.html'))
})
module.exports = app