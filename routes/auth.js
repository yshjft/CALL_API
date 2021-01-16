const express = require('express')
const passport =  require('passport')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
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
        const exUser = await User.findOne({where : {email: email}})
        if(exUser){
            const isSame = await bcrypt.compare(password, exUser.password)
            if(isSame){
                //토큰 발급
                const token = jwt.sign({
                    id: exUser.id,
                    email: exUser.email,
                    nick: exUser.nick
                }, process.env.JWT_SECRET, {
                    expiresIn: '10s'
                })

                return res.status(200).json({
                    status: 200,
                    token
                })

            }else{
                return res.json({
                    status: 'login Error',
                    type: 'wrong password'
                })
            }
        }else{
            return res.json({
                status: 'login Error',
                type: 'unregistered'
            })
        }
    }catch(error){
        return next(error)
    }
})

module.exports=router