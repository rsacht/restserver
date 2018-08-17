// ============================
// Porta
// ============================
process.env.PORT = process.env.PORT || 3000;

// ============================
// Ambiente
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

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