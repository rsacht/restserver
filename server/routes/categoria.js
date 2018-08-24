const express = require('express');
let{verificaToken} = require('../middlewares/auth');
let app = express();
let Categoria = require('../models/categoria');

// ===========================
// Cria nova categoria
// ===========================
app.post('/categorias', (req, res)=>{
    let body = req.body;

    let categoria = new Categoria({
        descricao: body.descricao,

    });
    //Retorna a nova categoria
    // Através da função verificaToken teremos acesso
    // ao ID da pessoa que criou a categoria
 });
 

module.exports = app;