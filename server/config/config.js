// ============================
// Porta
// ============================
process.env.PORT = process.env.PORT || 3000;

// ============================
// Ambiente
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
// JWT - Vencimento do Token
// ============================
//60 segundos
//60 minutos
//24 horas
//30 dias
process.env.EXPIRA_TOKEN = 60*60*24*30;

// ============================
// SEED de autenticação
// ============================
process.env.SEED = process.env.SEED || 'este-e-o-seed-de-desenvolvimento';
// ============================
// Base de Dados
// ============================
let urlDB;

if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe';
}else{
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

//Faça um teste com Postman e notarás que não dará erro ao processar
//Cadastre um novo usuário no banco remoto com POST
//Verifique em MLab que agora temos um registro em Collections
//Faça um refresh em Collections caso não esteja vendo o registro

// ============================
// Google Client Id
// ============================
process.env.CLIENT_ID = process.env.CLIENT_ID || '490468408570-397mtp64spuv20ojbf4fpdt48gvqhdp4.apps.googleusercontent.com';