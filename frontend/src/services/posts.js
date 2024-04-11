import axios from "axios";
const baseUrl = "http://localhost:3001/api/posts";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (data) => {
  const response = await axios.post(baseUrl, data);
  return response.data;
};

export default {
  createNew,
  getAll,
};
