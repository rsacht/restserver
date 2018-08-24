const express = require('express');
let{verificaToken} = require('../middlewares/auth');
let app = express();
let Categoria = require('../models/categoria');

// ===========================
// Cria nova categoria
// ===========================
app.post('/categorias', verificaToken, (req, res)=>{
    let body = req.body;

    let categoria = new Categoria({
        descricao: body.descricao,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB)=>{
        
    });
 });
 

module.exports = app;