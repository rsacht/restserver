const express = require('express');
const bcrypt = require('bcrypt');

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
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });
    //Crie um novo usuário através do Postman para testar
    //Note que o Postman está retornando o hash da senha
    //Precisamos impedir que o sistema devolva este hash para o usuário

    usuario.save((err, usuarioDB) =>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        //Remove o hash da senha antes de retornar os valores ao usuário:

        usuarioDB.password = null;

        //Mas se testar no Postman verá que ainda retona o campo password
        //E não queremos que o usuário saiba qual é o nome da coluna em
        //que guardamos a senha

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