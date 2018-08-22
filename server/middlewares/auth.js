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

module.exports ={
    verificaToken
}