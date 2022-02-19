const express = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VExperimentSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    situation: {
        type: String,
        required: false
    },
    personen: {
        type: String,
        required: false
    },
    sicherheitsverhalten: {
        type: String,
        required: false
    },
    befürchtungen: {
        type: String,
        required: false
    },
    experiment: {
        type: String,
        required: false
    },
    ergebnis: {
        type: String,
        required: false
    },
    lernerfahrungen: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = VExperiment = mongoose.model('vexperiment', VExperimentSchema);