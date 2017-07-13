'use strict'
var express = require('express')
var router = express.Router()

var studentModel = require('../models')

router.get('/students', (req,res) => {
  studentModel.Student.findAll()
  .then((data) => {
  // projects will be an array of all Project instances
    res.render('student', {dataStudent: data})
  })
})

router.get('/students/add', (req,res) => {
  res.render('add_student')
})

router.post('/students/add/', (req,res) => {
  studentModel.Student.create({ first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, jurusan: req.body.jurusan, createdAt: new Date(), updatedAt: new Date() })
  .then(() => {
    res.redirect('/students')
  })
  .catch((err) => {
    res.redirect('/students/add')
  })
})

router.get('/students/delete/:id', (req,res) => {
  studentModel.Student.destroy({where: {id: req.params.id}})
  .then(() => {
    res.redirect('/students')
  })
})

router.get('/students/edit/:id', (req,res) => {
  studentModel.Student.findById(req.params.id)
  .then((data) => {
    res.render('edit_student', {dataEdit: data})
})

router.post('/students/edit/:id', (req,res) => {
  studentModel.Student.update({first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, jurusan: req.body.jurusan}, {where: {id: req.params.id}})
  .then(() => {
    res.redirect('/students')
  })
  .catch((err) => {
    res.redirect(`/students/edit/${req.params.id}`)
    // res.send('tes')
  })
})

})

module.exports = router
