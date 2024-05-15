let token: string | null = null;

const setToken = (newToken: string | null) => {
  if (!newToken) {
    token = null;
  } else {
    token = `Bearer ${newToken}`;
  }
};

const getToken = () => {
  return token;
};

export default {
  setToken,
  getToken,
};
