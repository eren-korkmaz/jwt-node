const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//Import router
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();

//db bağlantısı
mongoose.connect(
    process.env.DB_BAGLANTISI
    ,{useNewUrlParser: true, useUnifiedTopology: true},
    ()=>{console.log('db bağlandı')}
)

//middeware
app.use(express.json())

//route middleware
app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);

app.get('/',(req,res) =>{
    res.send('ilk sayfa');
});

app.listen(3000,()=> console.log("calisti"));