'use strict'

var express = require('express')
var ejs = require('ejs')
var bodyParser = require('body-parser')

var app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


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


app.listen(3000)
