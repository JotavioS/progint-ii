const Empregado = require('../models/Empregado');

const EmpregadoController = {
  criar: async (req, res) => {
    try {
      const novoEmpregado = new Empregado(req.body);
      await novoEmpregado.save();
      res.status(201).json(novoEmpregado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  listar: async (req, res) => {
    try {
      const empregados = await Empregado.find().populate('endereco');
      res.status(200).json(empregados);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  procurar: async (req, res) => {
    try {
      const { id } = req.params;
      const empregado = await Empregado.findById(id).populate('endereco');
      if (empregado) {
        res.status(200).json(empregado);
      } else {
        res.status(404).json({ message: 'Funcionário não encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  atualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const empregadoAtualizado = await Empregado.findByIdAndUpdate(id, req.body, {
        new: true,
      }).populate('endereco');
      if (empregadoAtualizado) {
        res.status(200).json(empregadoAtualizado);
      } else {
        res.status(404).json({ message: 'Funcionário não encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  excluir: async (req, res) => {
    try {
      const { id } = req.params;
      const empregadoExcluido = await Empregado.findByIdAndRemove(id);
      if (empregadoExcluido) {
        res.status(200).json({ message: 'Funcionário excluído com sucesso' });
      } else {
        res.status(404).json({ message: 'Funcionário não encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = { EmpregadoController };