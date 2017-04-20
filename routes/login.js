const router = require('express').Router()
    , AV = require('leanengine')
    , request = require('superagent')
    , WXCrypt = require('../utils/WXCrypt')
    , { BCGKK_SNS, WX_BCGKK_APP_ID, WX_BCGKK_APP_SECRET_KEY } = require('../common/constants')

router
.get('/', (req, res) => {
  const code = req.query.code
      , iv = req.query.iv 
      , encryptedData = req.query.encryptedData

  if (!code || !iv || !encryptedData) return res.send({ msg: 'Missing Query String!' })
  
  request
  .get(`${BCGKK_SNS}&js_code=${code}`)
  .end((err, result) => {
    if (err) return res.json(err)
    if (!JSON.parse(result.text).errcode) {
      const sessionKey = JSON.parse(result.text).session_key
          , pc = new WXCrypt(WX_BCGKK_APP_ID, sessionKey)
          , wxInfo = pc.decrypt(encryptedData , iv)

          

    } else res.send(result.text)
  })
})

.post('/', (req, res) => {
  res.json({ msg: 'hi this is post login'})
})

module.exports = router