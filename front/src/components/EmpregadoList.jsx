import React, { useState, useEffect } from 'react';
import { getEmpregados, deleteEmpregado } from '../services/api';
import EmpregadoForm from './EmpregadoForm';

const EmpregadoList = () => {
  const [empregados, setEmpregados] = useState([]);
  const [selectedEmpregado, setSelectedEmpregado] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchEmpregados();
  }, []);

  const fetchEmpregados = async () => {
    try {
      const response = await getEmpregados();
      setEmpregados(response.data);
    } catch (error) {
      console.error('Erro ao buscar empregados:', error);
    }
  };

  const handleEditClick = (id) => {
    setSelectedEmpregado(id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmpregado(id);
      fetchEmpregados();
    } catch (error) {
      console.error('Erro ao excluir empregado:', error);
    }
  };

  const handleFormClose = () => {
    setSelectedEmpregado(null);
    setShowForm(false);
  };

  const handleAddNew = () => {
    setSelectedEmpregado(null);
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    // Recarregar a lista de empregados após a edição
    const fetchEmpregados = async () => {
      try {
        const response = await getEmpregados();
        setEmpregados(response.data);
      } catch (error) {
        console.error('Erro ao buscar empregados:', error);
      }
    };

    fetchEmpregados();
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Lista de Empregados</h1>
      <button className="btn btn-primary mb-4" onClick={handleAddNew}>
        Adicionar Novo Empregado
      </button>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Nome</th>
            <th>Salário</th>
            <th>Data de Nascimento</th>
            <th>Data de Admissão</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {empregados.map((empregado) => (
            <tr key={empregado._id}>
              <td>{empregado.nome}</td>
              <td>{empregado.salario}</td>
              <td>{new Date(empregado.dataNascimento).toLocaleDateString()}</td>
              <td>{new Date(empregado.dataAdmissao).toLocaleDateString()}</td>
              <td>
                <div className='d-flex' style={{gap: "10px"}}>
                  <button className="btn btn-primary btn-sm" onClick={() => handleEditClick(empregado._id)}>Editar</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(empregado._id)}>Excluir</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <>
          <EmpregadoForm
            show={showForm}
            empregadoId={selectedEmpregado}
            onFormSubmit={handleFormSubmit}
            onClose={handleFormClose}
          />
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default EmpregadoList;
