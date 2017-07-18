'use strict'

var express = require('express')
var ejs = require('ejs')
var bodyParser = require('body-parser')
var session = require('express-session')


var app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
  secret: '123456',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))

var indexModel = require('./models/index')
var teacherModel = require('./models/teacher')
var subjectModel = require('./models/subject')
var studentModel = require('./models/student')

var indexRouter = require('./routers/index')
var teacherRouter = require('./routers/teacher')
var subjectRouter = require('./routers/subject')
var studentRouter = require('./routers/student')

app.use('/', indexRouter)
app.use('/teachers', teacherRouter)
app.use('/subjects', subjectRouter)
app.use('/students', studentRouter)


app.listen(process.env.PORT || 3000)
