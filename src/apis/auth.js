import Api from ".";

export const login = async (body) => {
  const response = await Api.post("/login-account", body);
  return response;
};

export const register = async (body) => {
  const response = await Api.post("/create-account", body);
  return response;
};

export const logout = async (body) => {
  const response = await Api.post("/logout-account", body);
  return response;
};
