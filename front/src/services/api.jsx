import axios from 'axios';

const API_URL = 'http://localhost:9000'; // Substitua pela URL do seu backend

export const getEmpregados = () => axios.get(`${API_URL}/empregados`);
export const getEmpregadoById = (id) => axios.get(`${API_URL}/empregados/${id}`);
export const createEmpregado = (data) => axios.post(`${API_URL}/empregados`, data);
export const updateEmpregado = (id, data) => axios.put(`${API_URL}/empregados/${id}`, data);
export const deleteEmpregado = (id) => axios.delete(`${API_URL}/empregados/${id}`);

export const getEnderecos = () => axios.get(`${API_URL}/enderecos`);
export const getEnderecoById = (id) => axios.get(`${API_URL}/enderecos/${id}`);
export const createEndereco = (data) => axios.post(`${API_URL}/enderecos`, data);
export const updateEndereco = (id, data) => axios.put(`${API_URL}/enderecos/${id}`, data);
export const deleteEndereco = (id) => axios.delete(`${API_URL}/enderecos/${id}`);