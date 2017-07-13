'use strict'
var express = require('express')
var router = express.Router()

var subjectModel = require('../models')

router.get('/subjects', (req,res) => {
  subjectModel.Subject.findAll()
  .then(data => {
  // projects will be an array of all Project instances
    res.render('subject', {dataSubject: data})
  })
})

module.exports = router
