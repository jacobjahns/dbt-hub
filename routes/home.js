const path = require('path')
const express = require('express')
const router = express.Router()
const fs = require('fs')
const handlebars = require('handlebars')

// Models


// Routes
// @route   GET /
// @desc    Provide homepage
// @access  Public
router.get('/', (req, res) => {

    const templateStr = fs
                .readFileSync(path.join(__dirname, '../client/views/index.hbs'))
                .toString('utf8');
            const template = handlebars.compile(templateStr);

            return res.status(200).send(template());

})


// Routes
// @route   GET /gefuehl-aha
// @desc    Provide gefuehl-aha
// @access  Public
router.get('/eregulation', (req, res) => {

    const templateStr = fs
                .readFileSync(path.join(__dirname, '../client/views/eregulation.hbs'))
                .toString('utf8');
            const template = handlebars.compile(templateStr);

            return res.status(200).send(template());

})

// // Routes
// // @route   GET /vexperiment
// // @desc    Provide vexperiment
// // @access  Public
// router.get('/vexperiment', (req, res) => {

//     const templateStr = fs
//                 .readFileSync(path.join(__dirname, '../client/views/vexperiment.hbs'))
//                 .toString('utf8');
//             const template = handlebars.compile(templateStr);

//             return res.status(200).send(template());

// })

// @route   GET /*
// @desc    Provide 404 backup
// @access  Public
router.get('/*', (req, res) => res.status(404).send('Error 404 - Page not found'))

module.exports = router