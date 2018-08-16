const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

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
        default: 'USER_ROLE'
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

usuarioSchema.plugin(uniqueValidator, {message:'{PATH} deve ser único'});
//Teste no Postman: POST {{url}}/usuario
//Verifique a mensagem de erro
module.exports = mongoose.model('Usuario', usuarioSchema);