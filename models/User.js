const express = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: false,
        default: '',
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    hash: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = User = mongoose.model('user', UserSchema);