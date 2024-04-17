import axios from "axios";
import tokenService from "./token";
const baseUrl = "/api/users";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const follow = async (data) => {
  const config = {
    headers: { Authorization: tokenService.getToken() },
  };
  const response = await axios.post(`${baseUrl}/follow`, data, config);
  return response.data;
};

const unfollow = async (data) => {
  const config = {
    headers: { Authorization: tokenService.getToken() },
  };
  const response = await axios.post(`${baseUrl}/unfollow`, data, config);
  return response.data;
};

export default {
  getAll,
  follow,
  unfollow,
};
