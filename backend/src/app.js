let express = require ('express')
let app = express()
let cors = require('cors')
let authrouter = require('./router/authroutes')
app.use(cors({
     origin: 'http://localhost:5173', 
    credentials: true
}))
app.use(express.json())
app.use('/api/auth',authrouter)
module.exports = app