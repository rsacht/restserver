const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

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
        //Construção da assinatura com expiração em 30 dias
        let token = jwt.sign({
            usuario:usuarioDB
        },process.env.SEED,{expiresIn: process.env.EXPIRA_TOKEN})
        //Se passar em todas as validações retorne isto:
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });
    });
});

//Teste o login com um usuário válido no banco de dados
//No Postman faça um POST Keys: email e password
//Teste com erro no email e depois erre o password

//Configurações do Google
//Envia o token por parametro
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    //No payload estão todas as informações do usuário
    const payload = ticket.getPayload();

    console.log(payload.name);
    console.log(payload.email);
    console.log(payload.picture);
  }


app.post('/google', (req, res)=>{
    //Pega o token do Google e manda para o lado do servidor
    let token = req.body.idtoken;
    verify(token)
    res.json({
        token
    });
});

module.exports = app;