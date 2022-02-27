const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser')
const handlebars = require('handlebars')
const fs = require('fs')
const session = require('express-session')

dotenv.config({ path: './config/config.env' })

connectDB()

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'x-auth-token, content-type')
    next()
})

// Handlebars Partials
fs.readdirSync(path.join(__dirname, '/client/views/partials/')).forEach(partial => {
    let templateNav = fs.readFileSync(path.join(__dirname, '/client/views/partials/', partial), 'utf-8')
    handlebars.registerPartial(partial.slice(0, -4), templateNav)
})
// Handlebars Helpers
handlebars.registerHelper('dateConversion', require('./client/views/helpers/dateConversion'))


// Allow static paths in client folder
app.use(express.static(path.join(__dirname, '/client')));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
// Routes
app.use('/u(ser)?', require('./routes/user'))
app.use('/v((erhaltens)?experiment(e)?)?', require('./routes/vex'))
app.use('/', require('./routes/home'))

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT} ...`))