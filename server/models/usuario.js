const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nome:{
        type: String,
        required: [true, 'O nome é necessário']
    },
    email:{
        type: String,
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

module.exports = mongoose.model('Usuario', usuarioSchema);