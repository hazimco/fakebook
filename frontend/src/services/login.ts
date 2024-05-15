import axios from "axios";
import { LoginResponse } from "../types/types";
const baseUrl = "/api/login";

interface Credentials {
  username: string;
  password: string;
}

const login = async (credentials: Credentials) => {
  const response = await axios.post<LoginResponse>(baseUrl, credentials);
  return response.data;
};

export default { login };
