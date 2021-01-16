const jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next) => {
    try {
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        return next()
    }catch(error){
        if(error.name === 'TokenExpiredError'){
            return res.status(419).json({
                status: 419,
                message: 'Token expired'
            })
        }
        return res.status(401).json({
            status: 401,
            message: 'unvalid'
        })
    }
}