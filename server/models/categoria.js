const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    descricao:{ 
        type: String,
        unique: true,
        required: [ true,'A descrição é necessária'],
        usuario:{type: Schema.Types.ObjectId,ref: 'Usuario'}
    }
});

module.exports = mongoose.model('Categoria', categoriaSchema);