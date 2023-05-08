require('dotenv').config('../.env')
const express = require('express')
const {notFoundHandler,errorHandler} = require('./error')
const path = require('path')


const app = express()

app.use('/uploads',express.static(path.join(__dirname,'../uploads/')))

app.use(require('./middleware'))
app.use(require('./routes'))
app.use(notFoundHandler)
app.use(errorHandler)

module.exports = app