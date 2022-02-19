const express = require('express')
const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {

    try {
        jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, (err, data) => {
            if(err) throw err
    
            req.user = data.user
            next()
        })
    } catch {
        return res.status(401).redirect('/user/login/')
    }

}

module.exports = auth