const mongoose = require('mongoose');

const endereco = mongoose.Schema({
   logradouro: { type: String, required: [true, 'Favor insira o logradouro'] },
   numero: { type: Number, required: [true, 'Favor insira o numero'] },
   cep: { type: String, required: [true, 'Favor insira o Cep'] },
   complemento: { type: String }
});


const Endereco = mongoose.model('Endereco', endereco);

module.exports = Endereco;