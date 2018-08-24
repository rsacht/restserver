const express = require('express');
let{verificaToken} = require('../middlewares/auth');
let app = express();
let Categoria = require('../models/categoria');

module.exports = app;