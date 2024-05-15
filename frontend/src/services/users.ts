import axios from "axios";
import tokenService from "./token";
import { User } from "../types/types";
const baseUrl = "/api/users";

const getAll = async () => {
  const response = await axios.get<User[]>(baseUrl);
  return response.data;
};

const getLoggedInUser = async () => {
  const config = {
    headers: { Authorization: tokenService.getToken() },
  };
  const response = await axios.get<User>(`${baseUrl}/me`, config);
  return response.data;
};

const follow = async (id: string) => {
  const config = {
    headers: { Authorization: tokenService.getToken() },
  };
  const response = await axios.post<User>(`${baseUrl}/follow`, { id }, config);
  return response.data;
};

const unfollow = async (id: string) => {
  const config = {
    headers: { Authorization: tokenService.getToken() },
  };
  const response = await axios.post<User>(
    `${baseUrl}/unfollow`,
    { id },
    config
  );
  return response.data;
};

export default {
  getAll,
  getLoggedInUser,
  follow,
  unfollow,
};
