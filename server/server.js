const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//MIDDLEWARES - "use" sempre que houver petições passarão por eles
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//Consultar usuário
app.get('/usuario', function (req, res) {
  res.json('get Usuário funcionando');
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
 
app.listen(3000, () =>{
    console.log('Escutando na porta: ', 3000);
});

//No Postman, realize o seguinte teste:
    //Em Body selecione: x-www-form-urlencoded
    //key:nome  value:Rodrigo
    //key:idade  value:35
    //Desflague a key nome para que não envie o nome
    //POST: http://localhost:3000/usuario
//Retorno:
// {
//     "ok": false,
//     "mensagem": "O nome é necessário"
// }
//Status: 400 Bad Request