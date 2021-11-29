import Api from ".";

export const getLanguages = async () => {
  const response = await Api.post("/get-languages");
  return response;
};

export const createLanguage = async (body) => {
  const response = await Api.post("/create-language", body);
  return response;
};

export const updateLanguage = async (body) => {
  const response = await Api.patch("/update-language", body);
  return response;
};

export const deleteLanguage = async (body) => {
  const response = await Api.delete("/delete-language", {
    data: body,
  });
  return response;
};
