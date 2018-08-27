const express = require('express');
const fs = require('fs');

let app = express();

app.get('/:destinatario/:img', (req, resp) =>{
    let destinatario = req.params.destinatario;
    let img = req.params.img;
    let pathImg = `./uploads/${destinatario}/${img}`;

});

module.exports = app;