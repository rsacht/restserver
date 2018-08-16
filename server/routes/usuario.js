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

        //usuarioDB.password = null;

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
    //Pega o parâmetro id
    let id = req.params.id;
    //Pega o corpo da requisição
    let body = req.body;
    //Realiza a atualização das informações no banco de dados
    //Como queremos retornar o usuário atualizado com mongoose
    //De acordo com a documentação adicionamos {new:true} no terceiro parâmetro
    //Para aplicar as validações de Roles vamos adicionar a propriedade runValidators:true
    Usuario.findByIdAndUpdate(id, body,{new:true, runValidators:true}, (err, usuarioDB) =>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        //Retorne o que mandei na url
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })
    //=========== TESTE =========== //
    //Copie um id válido no Robo 3T
    //Faça uma requisição PUT no Postman da seguinte forma:
    //PUT {{url}}/usuario/cole_o_hash_do_id_aqui
    //Teremos status 200 porém ainda não realizamos nenhuma alteração
    //Em Body selecione x-www-form-urlencoded
    //key: role Value: dadada
    //Execute este PUT 
    //Note no JSON que agora retorna um erro de role não permitida
    //Execute o PUT com uma das roles permitidas e note que passará normalmente

});

//Excluir usuário
app.delete('/usuario', function (req, res) {
    res.json('delete Usuário funcionando');
});

module.exports = app;