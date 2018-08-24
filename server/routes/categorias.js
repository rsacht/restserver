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
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }
        if(!categoriaDB){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        res.json({
            ok:true,
            categoria: categoriaDB
        });
    });
 });
 
// ===========================
// Atualiza uma categoria por ID
// ===========================
app.put('/categorias/:id', (req, res)=>{
    let id = req.params.id;
    let body = req.body;
    let descCategoria = {
        descricao: body.decricao
    };

    Categoria.findByIdAndUpdate(id, descCategoria, {new:true, runValidators:true, context: 'query'}, (err, categoriaDB)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }
        if(!categoriaDB){
            return res.status(400).json({
                ok:false,
                err
            });
        }
    });
});


module.exports = app;