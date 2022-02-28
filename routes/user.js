const path = require('path')
const express = require('express')
const router = express.Router()
const fs = require('fs')
const handlebars = require('handlebars')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const mailTransporter = require('../config/mailTransporter')

// Models

const User = require('../models/User')


// Create new password
const newPassword = (req, res, u) => {
    const {email, password} = req.body
    if(!password || !email) res.status(400).json({ errMsg: 'Bitte die mit (*) markierten Felder ausfüllen.' })
    let {stay} = req.body
    if(!stay) stay = false

    bcrypt.genSalt(10, (err, salt) => {
        if(err) console.error(err)

        bcrypt.hash(password, salt, (err, hash) => {
            let newUser = undefined
            if(!u) {
                newUser = new User({
                    email,
                    hash,
                })
            } else {
                u.hash = hash
                newUser = u
            }

            newUser
                .save()
                .then(user => {
                    const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET)
                    const cookieOptions = { httpOnly: true }
                    if(stay) cookieOptions.maxAge = 2592000000
                    res.cookie('jwt', token, cookieOptions)

                    return res.status(304).redirect(req.session.returnTo || '/')
                })
                .catch(err => console.log(err))
        })
    })
}

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

    return newPassword(req, res)
    
})

// @route   GET /user/login
// @desc    Provide login  page
// @access  Public
router.get('/login', (req, res) => {

    const templateStr = fs
                .readFileSync(path.join(__dirname, '../client/views/login.hbs'))
                .toString('utf8')
            const template = handlebars.compile(templateStr)

            return res.status(200).send(template())

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

                return res.status(304).redirect(req.session.returnTo || '/')
            })
        })
        .catch(err => console.log(err))

})

// @route   GET /user/recoverpw
// @desc    Provide password recovery page
// @access  Public
router.get('/recoverpw', (req, res) => {

    const templateStr = fs
                .readFileSync(path.join(__dirname, '../client/views/recoverPw.hbs'))
                .toString('utf8')
            const template = handlebars.compile(templateStr)

            return res.status(200).send(template())

})

// @route   POST /user/recoverpw
// @desc    Send mail for password recovery
// @access  Public
router.post('/recoverpw', (req, res) => {
    
    const { email } = req.body
    if(!email) res.status(301).redirect('/user/recoverpw')
    
    User.findOne({ email })
    .then(user => {
        mailTransporter.sendMail({
            from: 'dbt-hub@web.de',
            to: email,
            subject: 'DBT-Hub - Passwort wiederherstellen',
            html: `<h1>Um Ihr Passwort neu zu setzen, klicken Sie auf den folgenden Link:</h1><br /><a href="http://dbt-hub.herokuapp.com/user/newpw/${email}/${user.hash.replaceAll('/', '')}">Hier klicken!</a>`
        }, (err, info) => {
            if(err) console.log(err)
            else console.log(info)
        })
    })
    .catch(err => console.log(err))
    
    return res.status(301).redirect('/user/login')
    
})

// @route   GET /user/newpw
// @desc    Provide new password page
// @access  Public
router.get('/newpw/:email/:hash', (req, res) => {

    const { email, hash } = req.params
    if(!email || !hash) return console.log('Error in URL')

    User.findOne({ email })
        .lean()
        .then(user => {
            const templateStr = fs
                .readFileSync(path.join(__dirname, '../client/views/newPw.hbs'))
                .toString('utf8')
            const template = handlebars.compile(templateStr)
            
            return res.status(200).send(template({ user }))
        })
        .catch(err => console.log(err))


})

// @route   POST /user/newpw
// @desc    Set new password
// @access  Public
router.post('/newpw/:email/:hash', (req, res) => {

    const { email, hash } = req.params
    if(!email || !hash) return console.log('Error in URL')
    req.body.email = email

    User.findOne({ email })
        .then(user => {
            if(user.hash.replace('/', '') != hash) return res.status(400).redirect('/user/recoverpw')

            return newPassword(req, res, user)
        })
        .catch(err => console.log(err))


})

module.exports = router