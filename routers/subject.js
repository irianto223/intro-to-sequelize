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
  model.StudentSubject.findAll({
    include: {all: true},
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

router.post('/subjects/:id/givescore', (req,res) => {
  model.StudentSubject.update({
    Score: req.body.nilai
  },
  {
    include: {all: true},
    where: {id: req.params.id}
  })
  .then(() => {
    res.redirect(`/subjects/${req.body.idSubject}/enrolledstudents`)
  })
})

module.exports = router
