import axios from "axios";
import tokenService from "./token";
import { Comment, Post } from "../types/types";
const baseUrl = "/api/posts";

const getAll = async () => {
  const response = await axios.get<Post[]>(baseUrl);
  return response.data;
};

const get = async (id: string) => {
  const response = await axios.get<Post>(`${baseUrl}/${id}`);
  return response.data;
};

const getComments = async (postId: string) => {
  const response = await axios.get<Comment[]>(`${baseUrl}/${postId}/comments`);
  return response.data;
};

const createNew = async (text: string) => {
  const config = {
    headers: { Authorization: tokenService.getToken() },
  };
  const response = await axios.post<Post>(baseUrl, { text }, config);
  return response.data;
};

interface AddCommentData {
  text: string;
  id: string;
}

const addComment = async (data: AddCommentData) => {
  const config = {
    headers: { Authorization: tokenService.getToken() },
  };
  const response = await axios.post<Comment>(
    `${baseUrl}/comment`,
    data,
    config
  );
  return response.data;
};

export default {
  createNew,
  getAll,
  get,
  getComments,
  addComment,
};
