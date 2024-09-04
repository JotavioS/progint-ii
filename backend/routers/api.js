const express = require('express');
const router = express.Router();
const { EmpregadoController } = require('../controllers/EmpregadoController');
const { EnderecoController } = require('../controllers/EnderecoController');

// Rotas para funcionários
router.post('/empregados', EmpregadoController.criar);
router.get('/empregados', EmpregadoController.listar);
router.get('/empregados/:id', EmpregadoController.procurar);
router.put('/empregados/:id', EmpregadoController.atualizar);
router.delete('/empregados/:id', EmpregadoController.excluir);

// Rotas para endereços
router.post('/enderecos', EnderecoController.criar);
router.get('/enderecos', EnderecoController.listar);
router.get('/enderecos/:id', EnderecoController.procurar);
router.put('/enderecos/:id', EnderecoController.atualizar);
router.delete('/enderecos/:id', EnderecoController.excluir);

module.exports = router;
