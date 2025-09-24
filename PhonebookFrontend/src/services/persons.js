import axios from "axios";

const baseURL = "/api/persons"; // Proxy to backend server

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const getById = async (id) => {
  const response = await axios.get(`${baseURL}/${id}`);
  return response.data;
};

const create = async (personData) => {
  const response = await axios.post(baseURL, personData);
  return response.data;
};

const update = async (id, personData) => {
  const response = await axios.put(`${baseURL}/${id}`, personData);
  return response.data;
};

const deletePerson = async (id) => {
  const response = await axios.delete(`${baseURL}/${id}`);
  return response.data;
};

export default {
  getAll,
  getById,
  create,
  update,
  deletePerson,
};