const express = require('express');
const app = express();

//Consultar usuário
app.get('/usuario', function (req, res) {
  res.json('get Usuário funcionando')
});
//Criar usuário
app.post('/usuario', function (req, res) {
    res.json('post Usuário funcionando')
  });
//Atualizar usuário
app.put('/usuario', function (req, res) {
res.json('put Usuário funcionando')
});
//Excluir usuário
app.delete('/usuario', function (req, res) {
res.json('delete Usuário funcionando')
});
 
app.listen(3000, () =>{
    console.log('Escutando na porta: ', 3000);
});

//No Postman, realize testes com cada um dos verbos HTTP em:
//http://localhost:3000/usuario