import axios from "axios";
const baseUrl = "/api/posts";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (data) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, data, config);
  return response.data;
};

export default {
  createNew,
  getAll,
  setToken,
};
