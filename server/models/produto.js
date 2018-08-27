var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var produtoSchema = new Schema({
    nome:{type: String, required:[true, 'Digite o nome']},
    precoUni:{type: Number, required:[true, 'Digite o preço unitário']},
    descricao:{type: String, required:false},
    img:{type: String, required:false},
    disponivel:{type: Boolean, required:true, default:true},
    categoria:{type:Schema.Types.ObjectId, ref:'Categoria', required:true},
    usuario:{type:Schema.Types.ObjectId, ref:'Usuario'}
});

module.exports = mongoose.model('Produto', produtoSchema);