import axios from "axios";
import tokenService from "./token";
import { Credentials, User } from "../types/types";
const baseUrl = "/api/users";

const getAll = async () => {
  const config = {
    headers: { Authorization: tokenService.getToken() },
  };
  const response = await axios.get<User[]>(baseUrl, config);
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

const create = async (credentials: Credentials) => {
  const response = await axios.post<User>(baseUrl, credentials);
  return response.data;
};

const uploadProfileImage = async (data: FormData) => {
  const config = {
    headers: { Authorization: tokenService.getToken() },
  };
  const response = await axios.post(`${baseUrl}/profile-image`, data, config);
  return response.data;
};

const editDescription = async (description: string) => {
  const config = {
    headers: { Authorization: tokenService.getToken() },
  };

  const response = await axios.put<Pick<User, "username" | "description">>(
    `${baseUrl}/description`,
    { description },
    config
  );
  return response.data;
};

export default {
  getAll,
  getLoggedInUser,
  follow,
  unfollow,
  create,
  uploadProfileImage,
  editDescription,
};
