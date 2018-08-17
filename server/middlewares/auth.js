//Verifica a authenticação do token
let verificaToken = (req, res, next) =>{
//Leitura do Header (Pegar o Token)
    let token = req.get('token');//ou Authorization caso tenha sido configurado assim
    //Retornar o token
    res.json({
        token
    });
}

module.exports ={
    verificaToken
}