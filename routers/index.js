'use strict'
var express = require('express')
var router = express.Router()
var session = require('express-session')

var model = require('../models')
var randomSecret = require('../helpers/randomSecret')
var hash = require('../helpers/hash')



router.get('/', (req,res) => {
  // console.log(JSON.stringify(req.session));
  // console.log(req.session.role);
  res.render('index', {pageTitle: 'welcome page', session: req.session})
})

router.get('/login', (req,res) => {
  res.render('login_page', {pageTitle: 'login page', session: req.session})
})

router.post('/login', (req,res) => {
  model.User.findOne({
    where: {
      username: req.body.username,
    }
  })
  .then(data => {
    // console.log(data.secret);
    // console.log(hash(data.secret, req.body.password));
    model.User.findOne({
      where: {
        password: hash(data.secret, req.body.password)
      }
    })
    .then(data2 => {
      // console.log(data2);
      if(data2) {
        req.session.username = data2.username
        req.session.password = data2.password
        req.session.role = data2.role
        res.redirect('/')
      }
      else {
        res.send('username atau password salah')
      }
    })
  })
})

router.get('/adduser', (req,res) => {
  res.render('add_user', {pageTitle: 'add user', session: req.session})
})

router.post('/adduser', (req,res) => {

  model.User.create(({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    createdAt: new Date(),
    updatedAt: new Date(),
    secret: randomSecret()
  }))
  .then(() => {
    res.redirect('/')
  })
})

router.get('/logout', (req,res) => {
  req.session.destroy()
  res.redirect('/')
})

module.exports = router
