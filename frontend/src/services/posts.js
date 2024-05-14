import axios from "axios";
import tokenService from "./token";
const baseUrl = "/api/posts";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const get = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const createNew = async (data) => {
  const config = {
    headers: { Authorization: tokenService.getToken() },
  };
  const response = await axios.post(baseUrl, data, config);
  return response.data;
};

const addComment = async (data) => {
  const config = {
    headers: { Authorization: tokenService.getToken() },
  };
  const response = await axios.post(`${baseUrl}/comment`, data, config);
  return response.data;
};

export default {
  createNew,
  getAll,
  get,
  addComment,
};
