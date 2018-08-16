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
//Teste no Postman enviando somente os dados nome, idade e email
//Retorno: 400 Bad Request com o JSON dos erros:
// {
//     "ok": false,
//     "err": {
//         "errors": {
//             "password": {
//                 "message": "A senha é obrigatória",
//                 "name": "ValidatorError",
//                 "properties": {
//                     "message": "A senha é obrigatória",
//                     "type": "required",
//                     "path": "password"
//                 },
//                 "kind": "required",
//                 "path": "password",
//                 "$isValidatorError": true
//             }
//         },
//         "_message": "Usuario validation failed",
//         "message": "Usuario validation failed: password: A senha é obrigatória",
//         "name": "ValidationError"
//     }
// }

//Teste novamente colocando todos os dados obrigatórios
//Retorno:
// {
//     "ok": true,
//     "usuario": {
//         "role": "USER_ROLE",
//         "estado": true,
//         "google": false,
//         "_id": "5b74eb4ffc57e13b48b54136",
//         "nome": "Rodrigo",
//         "email": "conectarodrigo@gmail.com",
//         "password": "123456",
//         "__v": 0
//     }
// }
//Starte o Mongo DB, Execute: sudo mongod
//Abra Robo 3T e verifique que agora temos a base de dados "cafe" criada
//E um objeto usuário registrado na tabela usuários
//No Postman salve a requisição em save
//Renomeie: POST: criar usuário
//Descrição: Criamos um usuário de BD
//Create Collection
//Nome: Cafe-Udemy
//Selecione Cafe-Udemy
//Salvar to Cafe-Udemy

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