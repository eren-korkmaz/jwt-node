const jwt = require('jsonwebtoken')

module.exports = function(req,res,next){

    const token = req.header('authtoken')
    if (!token) return res.status(401).send('giriş engellendi')

    try {
        const verified = jwt.verify(token,process.env.TOKEN_SECRET) //ikinokta araası
        req.kullanici = verified
        next()
    } catch (error) {
        res.status(401).send('token tutmadı')
    }

}