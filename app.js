const path = require('path')
const express = require("express")
const app = express()
const dotenv = require('dotenv')
const passport = require('passport')
const session = require('express-session')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const connectDB = require('./config/db')
const MongoStore = require("connect-mongo")

// Load config
dotenv.config({path:'./config/config.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

// Logging
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// Handlebars
app.engine('.hbs', exphbs.engine({defaultLayout:'main', extname: '.hbs'}))
app.set('view engine', '.hbs')
// seting up session

app.use(
    session({
        secret: "Keyboard cat",
        resave:false,
        saveUninitialized:false,
        store:MongoStore.create({mongoUrl: process.env.MONGO_URI}),
    })
)

// Passport middlewares
app.use(passport.initialize())
app.use(passport.session()) 

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

const PORT = process.env.PORT || 3000

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV}  node on port ${PORT}`)

)