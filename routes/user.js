const path = require('path')
const express = require('express')
const router = express.Router()
const fs = require('fs')
const handlebars = require('handlebars')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Models

const User = require('../models/User')


// Routes


// @route   GET /user/register
// @desc    Provide register page
// @access  Public
router.get('/register', (req, res) => {

    const templateStr = fs
                .readFileSync(path.join(__dirname, '../client/views/register.hbs'))
                .toString('utf8');
            const template = handlebars.compile(templateStr);

            return res.status(200).send(template());

})

// @route   POST /user/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {

    const {name, email, password} = req.body
    if(!password || !email) res.status(400).json({ errMsg: 'Bitte die mit (*) markierten Felder ausfüllen.' })
    let {stay} = req.body
    if(!stay) stay = false

    User.findOne({ email })
        .then(user => {
            if(user != null) return res.status(400).json({ errMsg: 'Ein Nutzer mit dieser Email existiert schon.' })
        })
        .catch(err => console.log(err))

    bcrypt.genSalt(10, (err, salt) => {
        if(err) console.error(err)

        bcrypt.hash(password, salt, (err, hash) => {
            const newUser = new User({
                email,
                hash,
            })
            if(name) newUser.name = name

            newUser
                .save()
                .then(user => {
                    const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET)
                    const cookieOptions = { httpOnly: true }
                    if(stay) cookieOptions.maxAge = 2592000000
                    res.cookie('jwt', token, cookieOptions)

                    return res.status(304).redirect('/')
                })
                .catch(err => console.log(err))
        })
    })
})

// @route   GET /user/login
// @desc    Provide login  page
// @access  Public
router.get('/login', (req, res) => {

    const templateStr = fs
                .readFileSync(path.join(__dirname, '../client/views/login.hbs'))
                .toString('utf8');
            const template = handlebars.compile(templateStr);

            return res.status(200).send(template());

})

// @route   POST /user/login
// @desc    Log user in
// @access  Public
router.post('/login', (req, res) => {

    const {email, password} = req.body
    if(!password || !email) res.status(400).json({ errMsg: 'Bitte die mit (*) markierten Felder ausfüllen.' })
    let {stay} = req.body
    if(!stay) stay = false

    User.findOne({ email })
        .then(user => {
            bcrypt.compare(password, user.hash, (err, same) => {
                if(err) console.log(err)

                if(!same) return res.status(400).json({ errMsg: 'Email oder Passwort falsch.' })

                const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET)
                const cookieOptions = { httpOnly: true }
                if(stay) cookieOptions.maxAge = 2592000000
                res.cookie('jwt', token, cookieOptions)

                return res.status(304).redirect('/')
            })
        })
        .catch(err => console.log(err))

})

// @route   GET /user/recoverpw
// @desc    Provide password recovery page
// @access  Public
router.get('/recoverpw', (req, res) => {

    return res.status(200).send('<h1>HAHA, verkackt</h1>');

})

module.exports = router