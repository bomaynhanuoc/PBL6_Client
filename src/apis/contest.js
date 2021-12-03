import Api from ".";

export const getContests = async () => {
  const response = await Api.post("/get-contests");
  return response;
};

export const getContest = async (body) => {
  const response = await Api.post("/get-contest", body);
  return response;
};

export const addParticipant = async (body) => {
  const response = await Api.post("/add-participant", body);
  return response;
};

export const createSubmit = async (body) => {
  await Api.post("/create-submit", body);
};

export const getSubmits = async (body) => {
  const response = await Api.post("/get-submits", body);
  return response;
};

export const createContest = async (body) => {
  const response = await Api.post("/create-contest", body);
  return response;
};

export const updateContest = async (body) => {
  const response = await Api.patch("/update-contest", body);
  return response;
};

export const deleteContest = async (body) => {
  const response = await Api.delete("/delete-contest", {
    data: body,
  });
  return response;
};
