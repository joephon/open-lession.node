const router = require('express').Router()

router.get('/', (req, res) => {
  res.json({ 
    host: 'https://open-lession.leanapp.cn',
    ex: {
      login: '/ex/login',
    }
  })
})


module.exports = router