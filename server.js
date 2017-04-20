const express = require('express')
    , app = express()
    , AV = require('leanengine')

AV.init({
  appId: process.env.LEANCLOUD_APP_ID ,
  appKey: process.env.LEANCLOUD_APP_KEY ,
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY 
})


app.use(AV.express())
app.listen(process.env.LEANCLOUD_APP_PORT)