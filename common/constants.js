module.exports.host = 'https://open-lession.leanapp.cn/'
module.exports.BCGKK_SNS = `https://api.weixin.qq.com/sns/jscode2session?grant_type=authorization_code&appid=${process.env.WX_BCGKK_APP_ID}&secret=${process.env.WX_BCGKK_APP_SECRET_KEY}` 
module.exports.WX_BCGKK_APP_ID = process.env.WX_BCGKK_APP_ID
module.exports.WX_BCGKK_APP_SECRET_KEY = process.env.WX_BCGKK_APP_SECRET_KEY
module.exports.WX_BCGKK_SALT = process.env.WX_BCGKK_SALT
