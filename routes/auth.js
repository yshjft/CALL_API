const express = require('express')
const bcrypt = require('bcryptjs')
const {User} = require('../models')

const router = express.Router()

router.post('/join', async(req, res, next)=>{
    const {email, nick, password} = req.body

    try{
        const exUser = await User.findOne({where: {email: email}})
        if(exUser){
            // http status : 409 conflict
            res.status(409).json({
                status: 409,
                message: 'existed'
            })
        }
        const hash = await bcrypt.hash(password, 14)
        await User.create({
            email,
            nick,
            password: hash,
        })
        res.status(201).json({
            status: 201,
            message: 'created'
        })
    }catch(error){
        return next(error)
    }
})

router.post('/login', async(req, res, next)=>{
    const {email, password} = req.body

    try{
        const exUser = await User.findOne({where : {eamil: email}})

    }catch(error){
        return next(error)
    }
})

module.exports=router