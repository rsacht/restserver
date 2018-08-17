const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const app = express();

app.post('/login', (req, res)=>{
    //No body temos o email e o password do usuário
    let body = req.body;
    //Verificar se o email existe
    //Se o email não existe usuarioDB será null e disparará o erro de servidor
    Usuario.findOne({email: body.email}, (err, usuarioDB) =>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }
        //Se não retornar um usuário exibirá esta mensagem de erro
        if (!usuarioDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'(Usuário) ou senha incorretos'
                }
            });
        }
        //Se a comparação da senha não for igual(match)
        if(!bcrypt.compareSync(body.password, usuarioDB.password)){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'Usuário ou (senha) incorretos'
                }
            });
        }
        //Se passar em todas as validações retorne isto:
        res.json({
            ok: true,
            usuario: usuarioDB,
            token: '123'
        });
    });
});

//Teste o login com um usuário válido no banco de dados
//No Postman faça um POST Keys: email e password
//Teste com erro no email e depois erre o password

module.exports = app;