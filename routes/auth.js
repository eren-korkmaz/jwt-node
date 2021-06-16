const router = require('express').Router();
const Kullanici = require('../model/Kullanici')

router.post('/register', async (req,res) => {
    
    const kullanici = new Kullanici({
        adiSoyadi:req.body.adiSoyadi,
        email:req.body.email,
        sifre:req.body.sifre
    })

    console.log(kullanici);

    try {
        const kulKaydet = await kullanici.save()
        res.send(kulKaydet)
    } catch (err) {
        res.status(400).send(err)
    }

})


module.exports = router;