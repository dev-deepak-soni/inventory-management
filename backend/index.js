const express = require('express')

const app = express()

require('dotenv').config()

var cors = require('cors'); 

const port = process.env.PORT

const config = require('./config/config')

const loginWithGoogle = require('./routes/google')

const user = require('./routes/User-routes.js')

app.use(cors())

app.use('/',user); //login routes

app.use('/google',loginWithGoogle); //Google login routes

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
