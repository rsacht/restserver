const express = require('express');
const fs = require('fs');
const path = require('path');

let app = express();

app.get('/imagem/:destinatario/:img', (req, res) =>{
    let destinatario = req.params.destinatario;
    let img = req.params.img;

    let pathImagem = path.resolve(__dirname, `../../uploads/${destinatario}/${img}`);
    let noImagePath = path.resolve(__dirname,'../assets/no-image.jpg')

    res.sendfile(noImagePath);

});

module.exports = app;