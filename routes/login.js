const router = require('express').Router()
    , AV = require('leanengine')
    , request = require('superagent')
    , WXCrypt = require('../utils/WXCrypt')
    , { WX_EX_SNS, WX_EX_APP_ID, WX_EX_APP_SECRET_KEY } = require('../common/constants')
    
class User extends AV.Object {}
AV.Object.register(User)

router
.get('/', (req, res) => {
  const code = req.query.code
      , iv = req.query.iv 
      , encryptedData = req.query.encryptedData

  if (!code || !iv || !encryptedData) return res.send({ msg: 'Missing Query String!' })
  
  request
  .get(`${WX_EX_SNS}&js_code=${code}`)
  .end((err, result) => {
    if (err) return res.json(err)
    if (!JSON.parse(result.text).errcode) {
      const sessionKey = JSON.parse(result.text).session_key
          , pc = new WXCrypt(WX_EX_APP_ID, sessionKey)
          , wxInfo = pc.decrypt(encryptedData , iv)
          , query = new AV.Query('_User')
      query.eaualTo('openId', wxInfo.openId)
      query.find()
      .then(users => {
        if (!users.lenght) {
          user = new User()
          user.set('openId', wxInfo.openId)
          user.set('wxInfo', wxInfo)
          user.set('createdAt', new Date())
          return user.save()
        } else {
          users[0].set('wxInfo', wxInfo)
          users[0].set('updatedAt', new Date())
          return users[0].save()
        }
      })
      .catch(error => {
        res.json(error)
      })

          

    } else res.send(result.text)
  })
})

.post('/', (req, res) => {
  res.json({ msg: 'hi this is post login'})
})

module.exports = router