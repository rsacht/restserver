const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

//Objeto Usuário para trabalhar com os Schemas
const Usuario = require('../models/usuario');

//Importando a função que verifica o Token
const {verificaToken} = require('../middlewares/auth');

const app = express();

//Consultar usuário
//Adicionando um middleware de verificação do Token (segundo argumento)
//O middleware verificaToken será disparado quando a rota for realizada
//Teste no Postman: Copie um token de login de algum usuário
//Faça uma requisição GET: em Headers Key: token Value: cole o Token
//Retornará o token do Headers
app.get('/usuario', verificaToken,(req, res) => {
    //Retorna um json com todas as propriedades do usuário
    return res.json({
        usuario:req.usuario,
        nome:req.usuario.nome,
        email:req.usuario.email
    })
    //Define a partir de qual registro deve ser efetuada a busca
    let desde = req.query.desde || 0;
    //Define a variável como numérica para ser utilizada no skip
    desde = Number(desde);
    //Define o limite de objetos por página, default = 5
    let limite = req.query.limite || 5;
    limite = Number(limite);

    //({})Para trazer todos os registros dessa coleção
    //Definindo os campos que queremos mostrar no retorno JSON
    //estado:true para trazer apenas usuários ativos
    Usuario.find({estado:true}, 'nome email role estado google')
        .skip(desde)//Pula x registros
        .limit(limite)//Limita a quantidade de registros
        .exec((err, usuarios) =>{
            if(err){
                return res.status(400).json({
                    ok:false,
                    err
                });
            }
            Usuario.count({estado:true}, (err, conteo)=>{
                res.json({
                    ok: true,
                    usuarios,
                    qtd_total_de_registros: conteo
                });
                //No Postman, verifique o retorno da contagem após o ultimo registro
            });
        });
  });
//========== TESTE ==========//
//Tenha 16 registros no banco de dados
//Faça uma busca a partir do segundo registro: {{url}}/usuario?desde=2
//Faça uma busca a partir de um registro inexistente: {{url}}/usuario?desde=20
//Faça uma busca limitando em 10:{{url}}/usuario?limite=10
//Faça uma busca limitando em 10 e a partir do 6 registro:
//{{url}}/usuario?limite=10&desde=6


//Criar usuário
app.post('/usuario', function (req, res) {
    //"body" será processado sempre que o body-parser processe 
    //um payload que receba as petições
    let body = req.body;

    let usuario = new Usuario({
        nome: body.nome,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });
    //Crie um novo usuário através do Postman para testar
    //Note que o Postman está retornando o hash da senha
    //Precisamos impedir que o sistema devolva este hash para o usuário

    usuario.save((err, usuarioDB) =>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        //Remove o hash da senha antes de retornar os valores ao usuário:

        //usuarioDB.password = null;

        //Mas se testar no Postman verá que ainda retona o campo password
        //E não queremos que o usuário saiba qual é o nome da coluna em
        //que guardamos a senha

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

//Atualizar usuário
app.put('/usuario/:id', function (req, res) {
    //Pega o parâmetro id
    let id = req.params.id;
    //Pega o corpo da requisição
    //Define as propriedades que podem ser atualizadas pela função pick de underscore
    let body = _.pick(req.body,
        [
        'nome',
        'email',
        'img',
        'role',
        'estado'
        ]
    );
    //Realiza a atualização das informações no banco de dados
    //Como queremos retornar o usuário atualizado com mongoose
    //De acordo com a documentação adicionamos {new:true} no terceiro parâmetro
    //Para aplicar as validações de Roles vamos adicionar a propriedade runValidators:true
    //Context:query é para aplicar a validação a todos os campos inclusive e-mail
    Usuario.findByIdAndUpdate(id, body,{new:true, runValidators:true, context: 'query'}, (err, usuarioDB) =>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        //Retorne o que mandei na url
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })
    //=========== TESTE =========== //
    //Copie um id válido no Robo 3T
    //Faça uma requisição PUT no Postman da seguinte forma:
    //PUT {{url}}/usuario/cole_o_hash_do_id_aqui
    //Teremos status 200 porém ainda não realizamos nenhuma alteração
    //Em Body selecione x-www-form-urlencoded
    //key: role Value: dadada
    //Execute este PUT 
    //Note no JSON que agora retorna um erro de role não permitida
    //Execute o PUT com uma das roles permitidas e note que passará normalmente

});

//Excluir usuário
app.delete('/usuario/:id', function (req, res) {
    let id = req.params.id;
    //Deletando usuário mudando o campo estado para false
    //Usuario.findByIdAndRemove(id, (err, usuarioExcluido) =>{
    let mudaEstado ={
        estado:false
    }
    Usuario.findByIdAndUpdate(id, mudaEstado, {new:true},(err, usuarioExcluido) =>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        };
        //Se tentar excluir novamente um usuário já excluído
        if(!usuarioExcluido){
            return res.status(400).json({
                ok:false,
                err:{
                    message: 'Usuário não encontrado!'
                }
            });
        }
        res.json({
            ok:true,
            usuario: usuarioExcluido
        })
    });
});
//=========== TESTE ========//
//Copie um id de usuário no Robo 3T
//Execute DELETE {{url}}/usuario/id_de_um_usuario


module.exports = app;