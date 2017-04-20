const router = require('express').Router()

router.get('/', (req, res) => {
  res.json({ 
    host: 'https://open-lession.leanapp.cn',
    login: '/login'
  })
})


module.exports = router