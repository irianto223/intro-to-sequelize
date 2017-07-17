'use strict'
var express = require('express')
var router = express.Router()

var model = require('../models')

router.use((req,res,next) => {
  if (req.session.role == 'headmaster') {
    next()
  }
  else {
    res.sendStatus(401)
  }
})

router.get('/', (req,res) => {
  model.Teacher.findAll({
    include: model.Subject
  })
  .then(data => {
    res.render('teacher', {dataTeacher: data, pageTitle: 'teacher page'})
  })
})

router.get('/add', (req,res) => {
  model.Subject.findAll()
  .then((data) => {
    res.render('add_teacher', {dataSubject: data, pageTitle: 'add teacher'})
  })
})

router.post('/add', (req,res) => {
  model.Teacher.create({first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, SubjectId: req.body.SubjectId, createdAt: new Date(), updatedAt: new Date()})
  .then(()=> {
    res.redirect('/teachers')
  })
})

router.get('/delete/:id', (req,res) => {
  model.Teacher.destroy({where: {id: req.params.id}})
  .then(data => {
    res.redirect('/teachers')
  })
})

router.get('/edit/:id', (req,res) => {
  model.Teacher.findById(req.params.id)
  .then(data => {
    model.Subject.findAll()
    .then((data2) => {
      res.render('edit_teacher', {dataEdit: data, dataSubject: data2, pageTitle: 'edit teacher'})
    })
  })
})

router.post('/edit/:id', (req,res) => {
  model.Teacher.update({first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, SubjectId: req.body.SubjectId, updatedAt: new Date()}, {where: {id: req.params.id}})
  .then(() => {
    res.redirect('/teachers')
  })
})

module.exports = router
