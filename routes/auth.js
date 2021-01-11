const express = require('express')
const router = express.Router()

router.post('/join', (req, res, next)=>{
    const {email, nick, password} = req.body

    console.log(email, nick, password)

    res.status(200).json({
        message: '잘 받았어요'
    })
})

module.exports=router