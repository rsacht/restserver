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
        },process.env.SEED,{expiresIn: process.env.EXPIRA_TOKEN});
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

    return{
        nome: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
  }


app.post('/google', async (req, res)=>{
    //Pega o token do Google e manda para o lado do servidor
    let token = req.body.idtoken;
    let googleUser = await verify(token)
        .catch(e => {
            return res.status(403).json({
                ok: false,
                err: e
            });
        });
    // =========== VALIDAÇÔES ============ //
    // Verificar se o e-mail pertence a um usuário cadastrado
        Usuario.findOne({email:googleUser.email}, (err, usuarioDB)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                });
            };
            
            if(usuarioDB){
                //Se o usuário existe e não é autenticado pelo Google
                if(usuarioDB.google === false){
                    return res.status(400).json({
                        ok:false,
                        err:{
                            message: 'Use a sua autenticação normal'
                        }
                    }); 
                //Se o usuário foi autenticado pelo Google renova com um Token personalizado      
                }else{
                    let token = jwt.sign({
                        usuario:usuarioDB
                    },process.env.SEED,{expiresIn: process.env.EXPIRA_TOKEN});
                    //Retorna a requisição ok, usuário e token renovado
                    return res.json({
                        ok: true,
                        usuario: usuarioDB,
                        token
                    });
                }
            //Se é a primeira vez que o usuário está se autenticando
            }else{
                //Se o usuário não existe na base de dados cria um objeto Usuário
                let usuario = new Usuario();
                //Propriedades do usuário
                usuario.nome = googleUser.nome;
                usuario.email = googleUser.email;
                usuario.img = googleUser.img;
                usuario.google = true;
                usuario.password = ':)';
                //Salva as informações do usuário no banco de dados
                usuario.save((err, usuarioDB) =>{
                    //Mensagem de erro caso ocorra algum erro
                    if(err){
                        return res.status(500).json({
                            ok: false,
                            err
                        });
                    };
                    //Se não há erros gera um novo token
                    let token = jwt.sign({
                        usuario:usuarioDB
                    },process.env.SEED,{expiresIn: process.env.EXPIRA_TOKEN});
                    //Imprime como uma resposta JSON
                    return res.json({
                        ok: true,
                        usuario: usuarioDB,
                        token
                    });
                });
            }      
        });


    // //Imprimindo diretamente os dados (Veja no console)
    // res.json({
    //     usuario: googleUser
    // });
});

module.exports = app;