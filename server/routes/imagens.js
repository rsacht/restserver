const express = require('express');
const fs = require('fs');
const path = require('path');
const{verificaToken} = require('../middlewares/auth');

let app = express();

app.get('/imagem/:destinatario/:img', verificaToken, (req, res) =>{
    let destinatario = req.params.destinatario;
    let img = req.params.img;

    let pathImagem = path.resolve(__dirname, `../../uploads/${destinatario}/${img}`);
    
    if(fs.existsSync(pathImagem)){
        res.sendFile(pathImagem);
    }else{
        let noImagePath = path.resolve(__dirname,'../assets/no-image.jpg');
        res.sendfile(noImagePath);
    }
});

module.exports = app;