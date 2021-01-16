const express = require('express')
const router = express.Router()
const {verifyToken} =require('./middlewares')
const {User} = require('../models')

router.get('/myData', verifyToken, async(req, res, next)=>{
    const userInfo =  await User.findOne({where: {id: req.decoded.id}})

    if(userInfo){
        return res.status(200).json({
            nick: userInfo.nick,
            email: userInfo.email
        })
    }else{
        return res.json({
            message: 'no data'
        })
    }
})

module.exports=router