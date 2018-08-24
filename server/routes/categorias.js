const express = require('express');
let{verificaToken, verificaAdminRole} = require('../middlewares/auth');
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
app.put('/categorias/:id',verificaToken, (req, res)=>{
    let id = req.params.id;
    let body = req.body;
    let descCategoria = {
        descricao: body.descricao
    };

    Categoria.findByIdAndUpdate(id, descCategoria, {new:true, runValidators:true}, (err, categoriaDB)=> {
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
// Exclui uma categoria por ID
// ===========================
app.delete('/categorias/:id', [verificaToken, verificaAdminRole], (req, res)=>{
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }
        if(!categoriaDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message: 'O id não existe'
                }
            });
        }
        res.json({
            ok:true,
            message: 'Categoria Excluída com Sucesso!'
        });
    });
 });
 


module.exports = app;