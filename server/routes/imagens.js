const express = require('express');
const fs = require('fs');

let app = express();

app.get('/:destinatario/:img', (req, resp) =>{
    let destinatario = req.params.destinatario;
    let img = req.params.img;
    
});

module.exports = app;