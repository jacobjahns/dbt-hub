const path = require('path')
const express = require('express')
const router = express.Router()
const fs = require('fs')
const handlebars = require('handlebars')

// Middleware

const auth = require('../middleware/auth')

// Models

const User = require('../models/User')
const VExperiment = require('../models/VExperiment')


// Routes


// @route   GET /user/v || /user/verhaltensexperimente
// @desc    Provide vexperiments page
// @access  Private
router.get('/', auth, (req, res) => {

    const user = User
        .findOne({ _id: req.user })
        .then(user => {
            const experiments = VExperiment
                .find({ userId: user._id })
                .lean()
                .then(vexperiments => {
                    errMsg = !vexperiments.length ? 'Keine Verhaltensexperimente gefunden.' : '';
        
                    const templateStr = fs
                        .readFileSync(path.join(__dirname, '../client/views/vexperiment.hbs'))
                        .toString('utf8');
                    const template = handlebars.compile(templateStr);
        
                    return res.status(200).send(template({
                        errMsg, 
                        user,
                        vexperiments 
                    }));
                })
                .catch(err => {
                    console.log(err)
                    res.status(404).json({ msg: "No experiments found"})
                })
        }

        )


})


// @route   POST /user/v || /user/verhaltensexperimente
// @desc    Create new vex
// @access  Private
router.post('/', auth, (req, res) => {

    const { vexName } = req.body
    
    if(!vexName) return res.status(400).json({ errMsg: 'Bitte einen Namen wählen.' })

    const newVex = VExperiment({
        userId: req.user,
        name: vexName,
    })

    newVex
        .save()
        .then(vex => res.status(200).json(vex))
        .catch(err => console.log(err))



})



module.exports = router