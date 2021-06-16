const mongoose = require('mongoose');

const scmKullanici = new mongoose.Schema({
    adiSoyadi:{
        type:String,
        required:true,
        min:8,
        max:100
    },
    email:{
        type:String,
        required:true,
        min:8,
        max:250
    },
    sifre:{
        type:String,
        required:true,
        min:8,
        max:250
    },
    date:{
        type:Date,
        default:Date.now
    }
},{collection:"Kullanici"})

module.exports = mongoose.model('Kullanici',scmKullanici)