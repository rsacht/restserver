const express = require('express');
const app = express();

//Rotas 
app.use(require('./usuario'));
app.use(require('./login'));
app.use(require('./categorias'));
app.use(require('./produtos'));
app.use(require('./uploads'));

module.exports = app;