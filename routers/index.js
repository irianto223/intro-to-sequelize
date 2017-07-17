'use strict'
var express = require('express')
var router = express.Router()
var session = require('express-session')

var model = require('../models')


router.get('/', (req,res) => {
  // console.log(JSON.stringify(req.session));
  // console.log(req.session.role);
  res.render('index', {pageTitle: 'welcome page'})
})

router.get('/login', (req,res) => {
  res.render('login_page')
})

router.post('/login', (req,res) => {
  model.User.findOne({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  })
  .then(data => {
    if(data) {
      req.session.username = data.username
      req.session.password = data.password
      req.session.role = data.role
      res.redirect('/')
    }
    else {
      res.send('username atau password salah')
    }
  })
})

module.exports = router
