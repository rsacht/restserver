const express = require('express');
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

    //Validação de formulário
    if(body.nome === undefined){
        res.status(400).json({
            ok:false,
            mensagem: 'O nome é necessário'
        });
    }else{
        res.json({
            usuario:body
        });
    }
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