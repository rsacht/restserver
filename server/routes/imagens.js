const express = require('express');
const fs = require('fs');

let app = express();

app.get('/imagem/:destinatario/:img', (req, res) =>{
    let destinatario = req.params.destinatario;
    let img = req.params.img;
    let pathImg = `./uploads/${destinatario}/${img}`;

    res.sendfile('./server/assets/no-image.jpg');

});

module.exports = app;