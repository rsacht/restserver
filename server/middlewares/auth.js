//Verifica a authenticação do token
let verificaToken = (req, res, next) =>{
//Leitura do Header (Pegar o Token)
    let token = req.get('token');//ou Authorization caso tenha sido configurado assim
 
    //Imprime o token no terminal
    console.log(token);

    //Uma vez que conseguimos pegar o token agora aplicamos o next para
    //que o restante da lógica do usuário ocorra
    next();
}

module.exports ={
    verificaToken
}