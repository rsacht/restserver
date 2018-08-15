const express = require('express');
const app = express();
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000, () =>{
    console.log('Escutando na porta: ', 3000);
});

//Realize o teste com o comando: node server/server
//No Postman execute GET: http://localhost:3000
//Verifique em headers que o formato de retorno é Content-Type →text/html; charset=utf-8
//Porém queremos que retorne formato JSON