'use strict'
var express = require('express')
var router = express.Router()

var model = require('../models')

router.get('/subjects', (req,res) => {
  model.Subject.findAll({
    include: model.Teacher
  })
  .then(data => {
    res.render('subject', {dataSubject: data})
    // console.log(data);
  })
})

module.exports = router
