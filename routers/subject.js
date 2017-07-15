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

router.get('/subjects/:id/enrolledstudents', (req,res) => {
  model.StudentSubjects.findAll({
    include: [model.Student, model.Subject],
    where: {SubjectId: req.params.id}
  })
  .then(data => {
    res.render('enrolled_students', {dataSS: data})
    // console.log(data);
  })
})

router.get('/subjects/:id/givescore', (req,res) => {
  model.StudentSubject.findById(req.params.id)
  .then(data => {
    res.render('give_score', {dataSS: data})
  })
})

module.exports = router
