const Endereco = require('../models/Endereco');

const EnderecoController = {

  criar: async (req, res) => {
    try {
      const novoEndereco = new Endereco(req.body);
      await novoEndereco.save();
      res.status(201).json(novoEndereco);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  listar: async (req, res) => {
    try {
      const enderecos = await Endereco.find();
      res.status(200).json(enderecos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  procurar: async (req, res) => {
    try {
      const { id } = req.params;
      const endereco = await Endereco.findById(id);
      if (endereco) {
        res.status(200).json(endereco);
      } else {
        res.status(404).json({ message: 'Endereço não encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  atualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const enderecoAtualizado = await Endereco.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (enderecoAtualizado) {
        res.status(200).json(enderecoAtualizado);
      } else {
        res.status(404).json({ message: 'Endereço não encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  excluir: async (req, res) => {
    try {
      const { id } = req.params;
      const enderecoExcluido = await Endereco.findByIdAndRemove(id);
      if (enderecoExcluido) {
        res.status(200).json({ message: 'Endereço excluído com sucesso' });
      } else {
        res.status(404).json({ message: 'Endereço não encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = { EnderecoController };