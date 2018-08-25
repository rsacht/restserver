const express = require ('express');
const{verificaToken} = require('../middlewares/auth');
let app = express();
let Produto = require('../models/produto');

// ===========================
// Cria um novo produto
// ===========================
app.post('/produtos', verificaToken, (req, res) =>{
    let body = req.body;
    let produto = new Produto({
        usuario: req.usuario._id,

    });
});

module.exports = app;