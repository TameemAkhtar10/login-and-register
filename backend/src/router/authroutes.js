let crypto = require('crypto')
let express = require('express')
let model = require('../model/usermodel')
let jwt = require('jsonwebtoken')
let cookie = require('cookie-parser')
let authrouter = express.Router()

authrouter.post('/rugitser', async (req, res) => {
    let { name, email, password } = req.body

    let isuserexist = await model.findOne({ email })
    if (isuserexist) {
        return res.status(409).json({
            message: "ye email s phle hi user exist krta hai "
        })
    }

    let hash = crypto.createHash('md5').update(password).digest('hex')
    let usermodel = await model.create({
        name, email, password:hash
    })
    let token = jwt.sign({
        id: usermodel._id,
        email: usermodel.email
    },
        process.env.JWT_SECRET
    )
    res.cookie('jwt-secret', token)
    res.status(201).json({
        message: 'account created successfully',
       
    })
})
authrouter.post('/login', async (req, res) => {
    let { email, password } = req.body
    let user = await model.findOne({ email })
    if (!user) {
        return res.status(404).json({
            message: "ye email s user exist hi ni  krta h bhai "
        })
    }
    let ispasswordmatched = user.password === crypto.createHash('md5').update(password).digest('hex')
    if (!ispasswordmatched) {
        return res.status(401).json({
            message: 'bhai password glt dala hai tu '
        })
    }
    let token = jwt.sign(
        {
            id:user._id,
        },
        process.env.JWT_SECRET
    )
    res.cookie('jwt-cookie',token)
    res.status(201).json({
        message :"login successfullyy",
        user,
        token

    })
})
module.exports = authrouter