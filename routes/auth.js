const router = require('express').Router();

const Kullanici = require('../model/Kullanici')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { registerValidation,loginValidation } = require('../validation')



router.post('/register', async (req,res) => {
    
    //kontrol ediyoruz
    const {error} = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message) 

    //varmi bakalım
    const emailKontrol = await Kullanici.findOne({email:req.body.email})
    if(emailKontrol) return res.status(400).send('aynı maile sahip biri var')


    //pass hashle
    const salt = await bcrypt.genSalt(10);
    const hashhedpass = await bcrypt.hash(req.body.sifre,salt)

    const kullanici = new Kullanici({
        adiSoyadi:req.body.adiSoyadi,
        email:req.body.email,
        sifre:hashhedpass
    })

    try {
        const kulKaydet = await kullanici.save()
        res.send({kullanici : kullanici._id})
    } catch (err) {
        res.status(400).send(err)
    }
    
})


//login

router.post('/login', async (req,res) => {

     //kontrol ediyoruz
     const {error} = loginValidation(req.body)
     if (error) return res.status(400).send(error.details[0].message) 

     //varmi bakalım
     const Lklnc = await Kullanici.findOne({email:req.body.email})
     if(!Lklnc) return res.status(400).send('kullanıcı bulunamadı')

     //sifre kont.
    const sifdogrumu = await bcrypt.compare(req.body.sifre,Lklnc.sifre)

    if (!sifdogrumu) return res.status(400).send('şifre yanlış')

    //jwttoken
    const token = jwt.sign({_id:Lklnc._id}, process.env.TOKEN_SECRET)
    res.header('authtoken',token).send(token)
    
 
})


module.exports = router;