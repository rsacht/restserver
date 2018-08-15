const express = require('express');
const app = express();

//Consultar usuário
app.get('/usuario', function (req, res) {
  res.json('get Usuário funcionando');
});
//Criar usuário
app.post('/usuario', function (req, res) {
    res.json('post Usuário funcionando');
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

//No Postman, realize testes com alterando valores no local de id:
//Exemplos:
    //http://localhost:3000/usuario/1354
    //http://localhost:3000/usuario/1208