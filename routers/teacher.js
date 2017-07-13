'use strict'
var express = require('express')
var router = express.Router()

var teacherModel = require('../models')

router.get('/teachers', (req,res) => {
  teacherModel.Teacher.findAll()
  .then(data => {
  // projects will be an array of all Project instances
    res.render('teacher', {dataTeacher: data})
  })
})

module.exports = router
