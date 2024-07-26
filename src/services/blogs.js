import axios from "axios";
const baseUrl = "/api/blogs";

const getHeaders = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = async (blog, token) => {
  const headers = getHeaders(token);
  const response = await axios.post(baseUrl, blog, headers);
  return response.data;
};

const updateLikes = async (id, likes, token) => {
  const headers = getHeaders(token);
  const response = await axios.put(`${baseUrl}/${id}`, likes, headers);
  return response.data;
};

export default { getAll, create, updateLikes };
