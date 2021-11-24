import Api from ".";

export const getAccounts = async (body) => {
  const response = await Api.post("/get-accounts", body);
  return response;
};

export const deleteAccount = async (body) => {
  const response = await Api.delete("/delete-account", {
    data: body,
  });
  return response;
};

export const updateAccount = async (body) => {
  const response = await Api.patch("/update-account", body);
  return response;
};
