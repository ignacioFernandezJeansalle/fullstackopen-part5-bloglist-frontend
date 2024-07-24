import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = async (blog, token) => {
  const headers = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(baseUrl, blog, headers);
  return response.data;
};

export default { getAll, create };
