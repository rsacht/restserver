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
    urlDB = 'mongodb://cafe-user:cafe123@ds223812.mlab.com:23812/cafe';
}
//Configurando o banco de dados na nuvem
//Acesse: https://mlab.com
//Crie o banco de dados: cafe
//Acesse o banco de dados e copie a URI do MongoDB
//mongodb://<dbuser>:<dbpassword>@ds223812.mlab.com:23812/cafe
//Em MLab clique em Users
//Em seguida clique em: Add database user
//Database username: cafe-user
//Database password: cafe123
//Make read-only: (não marque esta opção) é para configurar o usuário apenas para leitura
//CREATE
//Alterar dbuser e dbpassword do banco de dados de produção:
//mongodb://cafe-user:cafe123@ds223812.mlab.com:23812/cafe

process.env.URLDB = urlDB;

//Faça um teste com Postman e notarás que não dará erro ao processar
//Cadastre um novo usuário no banco remoto com POST
//Verifique em MLab que agora temos um registro em Collections
//Faça um refresh em Collections caso não esteja vendo o registro