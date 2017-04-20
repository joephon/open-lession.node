const express = require('express')
    , app = express()
    , AV = require('leanengine')
    , bodyParser = require('body-parser')
    , routes = require('./routes')

AV.init({
  appId: process.env.LEANCLOUD_APP_ID ,
  appKey: process.env.LEANCLOUD_APP_KEY ,
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY 
})

app.use(AV.express())
app.enable('trust proxy')
app.use(AV.Cloud.HttpsRedirect())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', routes.home)
app.use('/login', routes.login)

app.listen(process.env.LEANCLOUD_APP_PORT || 1111)