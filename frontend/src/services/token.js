let token = null;

const setToken = (newToken) => {
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
