import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

export interface User {
  id: string;
  username: string;
  posts: string[];
  following: string[];
  followedBy: string[];
  profileImage?: ProfileImage;
  description: string;
}

export interface ProfileImage {
  data: string;
  contentType: string;
}
export interface Post {
  id: string;
  text: string;
  createdAt: number;
  comments: string[];
  user: {
    username: string;
    id: string;
    profileImage?: ProfileImage;
  };
}

export interface Comment {
  id: string;
  text: string;
  createdAt: number;
  post: string;
  user: {
    username: string;
    id: string;
  };
}

export interface LoginResponse {
  username: string;
  token: string;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface IRefetchLoggedInUser {
  (options?: RefetchOptions): Promise<QueryObserverResult<User, Error>>;
}
