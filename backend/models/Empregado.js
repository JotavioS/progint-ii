const mongoose = require('mongoose');

const Dependente = mongoose.Schema({
   _id:false,
   nome:{type:String, required:[true,'Favor especificar o nome do dependente']},
   dataNascimento:{type:Date, required:[true,'Favor insira a data de nascimento do dependente']},
   parentesco:{type:String, required:[true,'Favor especificar o parentesco do dependente']}
});

const empregado = mongoose.Schema({
   nome:{type:String, required:[true,'Favor especificar o nome do funcionário']},
   dataNascimento:{type:Date, required:[true,'Favor insira a data de nascimento do funcionário']},
   salario:{type:Number, required:[true,'Favor insira o salário do funcionário']},
   dataAdmissao:{type:Date, required:[true,'Favor insira a data de admissao']},
   endereco:{type: mongoose.Schema.Types.ObjectId},
   dependentes:[Dependente]
});

const Empregado = mongoose.model('Empregado',empregado);

module.exports = Empregado;