const express = require('express');
//Objeto Usuário para trabalhar com os Schemas
const Usuario = require('../models/usuario');
const app = express();

//Consultar usuário
app.get('/usuario', function (req, res) {
    res.json('get Usuário Local funcionando');
  });
//Criar usuário
app.post('/usuario', function (req, res) {
    //"body" será processado sempre que o body-parser processe 
    //um payload que receba as petições
    let body = req.body;

    let usuario = new Usuario({
        nome: body.nome,
        email: body.email,
        password: body.password,
        role: body.role
    });

    usuario.save((err, usuarioDB) =>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

//Atualizar usuário
app.put('/usuario/:id', function (req, res) {
    let id = req.params.id;
    //Retorne o que mandei na url
    res.json({
        id
    });
});

//Excluir usuário
app.delete('/usuario', function (req, res) {
    res.json('delete Usuário funcionando');
});

module.exports = app;