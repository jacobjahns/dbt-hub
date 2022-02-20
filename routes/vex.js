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


// @route   GET /v/:id || /verhaltensexperimente/:id
// @desc    Provide vexperiment page
// @access  Private
router.get('/:id', auth, (req, res) => {

  const { id } = req.params

  const vexperiment = VExperiment
    .findOne({ _id: id })
    .lean()
    .then(vex => {
        errMsg = !vex ? 'Verhaltensexperiment nicht gefunden.' : '';

        const templateStr = fs
            .readFileSync(path.join(__dirname, '../client/views/vexperiment.hbs'))
            .toString('utf8');
        const template = handlebars.compile(templateStr);

        return res.status(200).send(template({
            errMsg, 
            vex, 
        }));
    })
    .catch(err => {
      console.log(err)
      res.status(404).json({ msg: "No experiment found"})
    })

})


// @route   GET /v || /verhaltensexperimente
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
                .readFileSync(path.join(__dirname, '../client/views/vexperiments.hbs'))
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


// @route   POST /v || /verhaltensexperimente
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
    .then(vex => res.status(200).redirect(`/v/new/${vex._id}/pre`))
    .catch(err => console.log(err))

})


// @route   GET /v/new/:id/pre
// @desc    Provide pre-experiment data page
// @access  Private
router.get('/new/:id/pre', auth, (req, res) => {

  const { id } = req.params

  const vexperiment = VExperiment
    .findOne({ _id: id })
    .lean()
    .then(vex => {
      const templateStr = fs
        .readFileSync(path.join(__dirname, '../client/views/vexperiment-pre.hbs'))
        .toString('utf8');
      const template = handlebars.compile(templateStr);

      return res.status(200).send(template({vex}));
    })
    .catch(err => console.log(err))

})


// @route   POST /v/new/:id/pre
// @desc    Edit pre-experiment data 
// @access  Private
router.post('/new/:id/pre', auth, (req, res) => {

  const { id } = req.params
  const {
    situation,
    personen,
    sicherheitsverhalten,
    befürchtungen,
    experiment,
  } = req.body
    
  if(!situation) return res.status(400).json({ errMsg: 'Bitte die Situation beschreiben.' })

  const vexperiment = VExperiment
    .findOne({ _id: id })
    .then(vex => {
      vex.situation = situation
      if(personen) vex.personen = personen
      if(sicherheitsverhalten) vex.sicherheitsverhalten = sicherheitsverhalten
      if(befürchtungen) vex.befürchtungen = befürchtungen
      if(experiment) vex.experiment = experiment

      vex
        .save()
        .then(vex => res.status(200).redirect(`/v/new/${id}/post`))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

})


// @route   GET /v/new/:id/post
// @desc    Provide post-experiment data page
// @access  Private
router.get('/new/:id/post', auth, (req, res) => {

  const { id } = req.params

  const vexperiment = VExperiment
    .findOne({ _id: id })
    .lean()
    .then(vex => {
      const templateStr = fs
        .readFileSync(path.join(__dirname, '../client/views/vexperiment-post.hbs'))
        .toString('utf8');
      const template = handlebars.compile(templateStr);

      return res.status(200).send(template({vex}));
    })
    .catch(err => console.log(err))

})


// @route   POST /v/new/:id/post
// @desc    Edit post-experiment data 
// @access  Private
router.post('/new/:id/post', auth, (req, res) => {

  const { id } = req.params
  const {
    ergebnis,
    lernerfahrungen,
  } = req.body
    
  if(!ergebnis) return res.status(400).json({ errMsg: 'Bitte das Ergebnis beschreiben.' })

  const vexperiment = VExperiment
    .findOne({ _id: id })
    .then(vex => {
      vex.ergebnis = ergebnis
      if(lernerfahrungen) vex.lernerfahrungen = lernerfahrungen

      vex
        .save()
        .then(vex => res.status(200).redirect(`/v/${id}`))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

})


module.exports = router