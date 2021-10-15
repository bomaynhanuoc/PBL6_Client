import Api from "./index";

export const login = async (body) => {
  const response = await Api.post("/loginaccount", body);
  return response;
};

export const register = async (body) => {
  const response = await Api.post("/createaccount", body);
  return response;
};

export const logout = async (body) => {
  const response = await Api.post("/logoutaccount", body);
  return response;
};
