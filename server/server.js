require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

//MIDDLEWARES - "use" sempre que houver petições passarão por eles
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json());

// Habilitar a pasta public
app.use(express.static(__dirname + '../public'));

//Testando
console.log(path.resolve(__dirname, '../public'));

//Configuração global de rotas
app.use(require('./routes/index'));

//Conectando Mongoose e Configuração de mensagem de erro
mongoose.connect(process.env.URLDB, (err,res) => {
    if(err)throw err;
    console.log('Base de dados ONLINE!');
});
//Verifique o funcionamento: nodemon server/server
//Teste com uma porta inexistente, por exemplo: 27

app.listen(process.env.PORT, () =>{
    console.log('Escutando na porta: ', process.env.PORT);
});

