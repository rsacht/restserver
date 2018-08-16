const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidas ={
    values: ['ADMIN_ROLE','USER_ROLE'],
    message:'{VALUE} não é uma role válida '
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nome:{
        type: String,
        required: [true, 'O nome é necessário']
    },
    email:{
        type: String,
        //Necessário para uso do mongoose-unique-validator
        unique:true,
        required:[true, 'O e-mail é necessário']
    },
    password:{
        type: String,
        required: [true, 'A senha é obrigatória']
    },
    img:{
        type: String,
        required: false
    }, 
    role:{
        type:String,
        default: 'USER_ROLE',
        enum: rolesValidas
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});

//Removendo o campo password da resposta ao imprimir JSON
usuarioSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}
//Teste no Postman o POST de um novo usuário. 
//O campo password não poderá aparecer na resposta JSON

usuarioSchema.plugin(uniqueValidator, {message:'{PATH} deve ser único'});
//Teste no Postman: POST {{url}}/usuario
//Adicione uma role não listada, ex: role SUPER_ROLE
//Verifique a mensagem de erro:
//"message": "SUPER_ROLE não é uma role válida ",


module.exports = mongoose.model('Usuario', usuarioSchema);