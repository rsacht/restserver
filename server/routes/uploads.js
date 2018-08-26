const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

// default options
app.use(fileUpload());

app.put('/upload', function(req, res) {
    if (!req.files)
    return res.status(400).send('Não há arquivos para upload.');
});