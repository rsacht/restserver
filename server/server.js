const express = require('express');
const app = express();
 
app.get('/', function (req, res) {
  res.json('Hello World')
})
 
app.listen(3000, () =>{
    console.log('Escutando na porta: ', 3000);
});

//Restarte o servidor com nodemon para restart automático em atualizações: 
    //Ctrl + C 
    //nodemon server/server
//No Postman execute novamente GET: http://localhost:3000
//Verifique em headers que agora o formato de retorno é Content-Type →application/json; charset=utf-8