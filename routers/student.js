'use strict'
var express = require('express')
var router = express.Router()

var model = require('../models')

router.get('/', (req,res) => {
  model.Student.findAll()
  .then((data) => {
    res.render('student', {dataStudent: data, pageTitle: 'student page'})
  })
})

router.get('/add', (req,res) => {
  res.render('add_student', {pageTitle: 'add student'})
})

router.post('/add/', (req,res) => {
  model.Student.findOne({where: {email: req.body.email}})
  .then(data => {
    if(!data || req.body.email === req.body.emailPembanding) {
      model.Student.create({ first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, jurusan: req.body.jurusan, createdAt: new Date(), updatedAt: new Date() })
      .then(() => {
        res.redirect('/students')
      })
      .catch(err => {
        res.send('email format is incorrect.')
      })
    }
    else {
      res.send('email sudah ada.')
    }
  })
})

router.get('/delete/:id', (req,res) => {
  model.Student.destroy({where: {id: req.params.id}})
  .then(() => {
    res.redirect('/students')
  })
})

router.get('/edit/:id', (req,res) => {
  model.Student.findById(req.params.id)
  .then((data) => {
    res.render('edit_student', {dataEdit: data, pageTitle: 'edit student'})
  })
})

router.post('/edit/:id', (req,res) => {
  model.Student.findOne({where: {email: req.body.email}})
  .then(data => {
    if(!data || req.body.email === req.body.emailPembanding) {
      model.Student.update({ first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, jurusan: req.body.jurusan, updatedAt: new Date()}, { where: { id: req.params.id }})
      .then(() => {
        res.redirect('/students')
      })
      .catch(err => {
        res.send('email format is incorrect.')
      })
    }
    else {
      res.send('email sudah ada.')
    }
  })
})

router.get('/:id/addsubject', (req,res) => {
  model.Student.findById(req.params.id)
  .then(data => {
    model.Subject.findAll()
    .then(data2 => {
      res.render('add_student_subject', {dataStudent: data, dataSubject: data2, pageTitle: 'add subject'})
    })
  })
})

router.post('/:id/addsubject', (req,res) => {
  model.StudentSubject.create({SubjectId: req.body.dropDownSubject, StudentId: req.params.id, createdAt: new Date(), updatedAt: new Date()})
  res.redirect(`/students`)
})

module.exports = router
