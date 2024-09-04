import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { NumericFormat } from 'react-number-format';
import { createEmpregado, updateEmpregado, createEndereco, getEnderecoById, getEmpregadoById } from '../services/api';

const EmpregadoForm = ({ show, empregadoId, onFormSubmit, onClose }) => {
    const [nome, setNome] = useState('');
    const [salario, setSalario] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [dataAdmissao, setDataAdmissao] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [cep, setCep] = useState('');
    const [complemento, setComplemento] = useState('');
    const [dependentes, setDependentes] = useState([{ nome: '', dataNascimento: '', parentesco: '' }]);

    useEffect(() => {
        if (show && empregadoId) {
            // Buscar dados do empregado
            const fetchEmpregadoData = async () => {
                try {
                    const empregadoResponse = await getEmpregadoById(empregadoId);
                    const empregadoData = empregadoResponse.data;
                    setNome(empregadoData.nome);
                    setSalario(empregadoData.salario);
                    setDataNascimento(empregadoData.dataNascimento.split('T')[0]);
                    setDataAdmissao(empregadoData.dataAdmissao.split('T')[0]);
                    setDependentes(empregadoData.dependentes.length > 0 ? empregadoData.dependentes : [{ nome: '', dataNascimento: '', parentesco: '' }]);

                    // Buscar dados do endereço
                    if (empregadoData.endereco) {
                        const enderecoResponse = await getEnderecoById(empregadoData.endereco);
                        const enderecoData = enderecoResponse.data;
                        setLogradouro(enderecoData.logradouro);
                        setNumero(enderecoData.numero);
                        setCep(enderecoData.cep);
                        setComplemento(enderecoData.complemento);
                    }
                } catch (error) {
                    console.error('Erro ao buscar dados do empregado:', error);
                }
            };

            fetchEmpregadoData();
        } else {
            setNome('');
            setSalario('');
            setDataNascimento('');
            setDataAdmissao('');
            setLogradouro('');
            setNumero('');
            setCep('');
            setComplemento('');
            setDependentes([]);
        }
    }, [show, empregadoId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Criação do endereço
        let enderecoId = null;
        try {
            const enderecoData = { logradouro, numero, cep, complemento };
            const enderecoResponse = await createEndereco(enderecoData);
            enderecoId = enderecoResponse.data._id;

            // Criação ou atualização do empregado
            const empregadoData = {
                nome, salario, dataNascimento, dataAdmissao,
                endereco: enderecoId,
                dependentes
            };

            if (empregadoId) {
                await updateEmpregado(empregadoId, empregadoData);
            } else {
                await createEmpregado(empregadoData);
            }
            onFormSubmit();
        } catch (error) {
            console.error('Erro ao salvar empregado:', error);
        }
    };

    const handleDependenteChange = (index, field, value) => {
        const newDependentes = [...dependentes];
        newDependentes[index][field] = value;
        setDependentes(newDependentes);
    };

    const handleAddDependente = () => {
        setDependentes([...dependentes, { nome: '', dataNascimento: '', parentesco: '' }]);
    };

    const handleRemoveDependente = (index) => {
        setDependentes(dependentes.filter((_, i) => i !== index));
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{empregadoId ? 'Editar Empregado' : 'Adicionar Empregado'}</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Nome</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Salário</label>
                                <NumericFormat
                                    value={salario}
                                    className="form-control"
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    prefix="R$ "
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    allowNegative={false}
                                    onValueChange={(values) => setSalario(values.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Data de Nascimento</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={dataNascimento}
                                    onChange={(e) => setDataNascimento(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Data de Admissão</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={dataAdmissao}
                                    onChange={(e) => setDataAdmissao(e.target.value)}
                                    required
                                />
                            </div>

                            <hr />

                            <h5>Endereço</h5>
                            <div className="form-group">
                                <label>Logradouro</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={logradouro}
                                    onChange={(e) => setLogradouro(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Número</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={numero}
                                    onChange={(e) => setNumero(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>CEP</label>
                                <InputMask
                                    mask="99999-999"
                                    className="form-control"
                                    value={cep}
                                    onChange={(e) => setCep(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Complemento</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={complemento}
                                    onChange={(e) => setComplemento(e.target.value)}
                                />
                            </div>

                            <hr />

                            <div>
                                <h5 className='mb-3'>Dependentes</h5>
                                {dependentes.map((dependente, index) => (
                                    <div key={index} className="border rounded p-3 mb-3">
                                        <div className="form-group">
                                            <label>Nome</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={dependente.nome}
                                                onChange={(e) => handleDependenteChange(index, 'nome', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Data de Nascimento</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                value={dependente.dataNascimento.split('T')[0]}
                                                onChange={(e) => handleDependenteChange(index, 'dataNascimento', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Parentesco</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={dependente.parentesco}
                                                onChange={(e) => handleDependenteChange(index, 'parentesco', e.target.value)}
                                                required
                                            />
                                        </div>
                                        {dependentes.length > 0 && (
                                            <button type="button" className="btn btn-danger" onClick={() => handleRemoveDependente(index)}>
                                                Remover Dependente
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button type="button" className="btn btn-secondary mb-3" onClick={handleAddDependente}>
                                    Adicionar Dependente
                                </button>
                            </div>

                            <div className='d-flex flex-row-reverse gap-6'>
                                <button type="submit" className="btn btn-primary">
                                    {empregadoId ? 'Atualizar' : 'Adicionar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmpregadoForm;