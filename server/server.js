require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

//MIDDLEWARES - "use" sempre que houver petições passarão por eles
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

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

mongoose.connect('mongodb://localhost/my_database');

app.listen(process.env.PORT, () =>{
    console.log('Escutando na porta: ', process.env.PORT);
});

