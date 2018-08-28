const jwt = require('jsonwebtoken');

//Verifica a authenticação do token
let verificaToken = (req, res, next) =>{
//Leitura do Header (Pegar o Token)
    let token = req.get('token');//ou Authorization caso tenha sido configurado assim
 
    //Comprovando que o token é válido
    jwt.verify(token, process.env.SEED, (err, decoded) =>{
        //Se não há erro a informação é correta 
        //e decoded vai conter a informação do usuário
        if(err){
            return res.status(401).json({
                ok:false,
                err: {
                    message: 'Token Inválido!'
                }
            });
        }
        //Qualquer requisição poderá ter acesso às informações do usuário
        //Somente após passar pelo verificaToken
        req.usuario = decoded.usuario;    
        //Uma vez que conseguimos pegar o token agora aplicamos o next para
        //que o restante da lógica do usuário ocorra
        next();
    });


}

//===========================
// Verifica AdminRole
//===========================
let verificaAdminRole = (req, res, next) =>{
    //Lê o usuário
    let usuario = req.usuario;
    //Verifica se o usuário é um administrador
    if(usuario.role === 'ADMIN_ROLE'){
        next();
    }else{
        return res.json({
            ok: false,
            err:{
                message: 'O usuário não é administrador'
            }
        });
    }
}
// TESTE no POSTMAN
// Renove o token do usuário efetuando novo login
// Grave o novo token na variável de ambiente de desenvolvimento: Engrenagem
// Utilize o novo token em Headers: token {{token}}
// Efetue o cadastro de um novo usuário POST Criar Usuário
// Para testar a atualização faça um GET usuario para obter a lista dos usuários
// Copie um id de usuário qualquer
// Faça a atualização: PUT {{url}}/usuario/cole_o_id_aqui
// Em Body faça a alteração dos dados e execute o PUT
// Para efetuar o DELETE, cole o id do usuário e execute

//===========================
// Verifica Token para a Imagem
//===========================
let verificaTokenImg = (req, res, next) =>{
    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, decoded) =>{
        //Se não há erro a informação é correta 
        //e decoded vai conter a informação do usuário
        if(err){
            return res.status(401).json({
                ok:false,
                err: {
                    message: 'Token Inválido!'
                }
            });
        }
        //Qualquer requisição poderá ter acesso às informações do usuário
        //Somente após passar pelo verificaToken
        req.usuario = decoded.usuario;    
        //Uma vez que conseguimos pegar o token agora aplicamos o next para
        //que o restante da lógica do usuário ocorra
        next();
    });
}

module.exports ={
    verificaToken,
    verificaAdminRole,
    verificaTokenImg
}