const router = require('express').Router();
const Kullanici = require('../model/Kullanici');
const verify = require('./verifyToken')

router.get('/', verify, (req,res) => {
    res.json({posts:[{baslik:"merhaba",metin:"aciklama"}]})
    //res.send(req.kullanici)
})


module.exports = router;