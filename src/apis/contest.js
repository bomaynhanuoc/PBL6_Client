import Api from ".";

export const getContests = async () => {
  const response = await Api.get("/get-contests");
  return response;
};
