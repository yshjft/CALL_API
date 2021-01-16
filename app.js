const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const morgan =  require('morgan')
const path =  require('path')
require('dotenv').config()


const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const {sequelize} = require('./models')

const app = express()
app.set('port', process.env.PORT || 8002)
sequelize.sync()

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
    resave: false,
    saveUninitailized: false,
    secret: process.env.COOKIE_SECRET,
    cookie :{
        httpOnly: true,
        secure: false
    }
}))

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.use((req, res, next)=>{
    const err =  new Error('NOT FOUND')
    err.status=404
    next(err)
})

app.use((err, req, res, next)=>{
    console.log(err)
})

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), ' 번 포트에서 대기중')
})
