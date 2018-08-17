const express = require('express');
const app = express();

//Rotas 
app.use(require('./usuario'));
//Efetue o teste no Postman GET: {{url}}/usuario
app.use(require('./login'));
//Efetue o teste no Postman POST: {{url}}/login

module.exports = app;