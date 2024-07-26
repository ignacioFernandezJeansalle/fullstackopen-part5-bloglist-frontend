import axios from "axios";
const baseUrl = "/api/blogs";

const getHeaders = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const create = async (blog, token) => {
  const headers = getHeaders(token);
  const response = await axios.post(baseUrl, blog, headers);

  const createdBlog = await getById(response.data.id);
  return createdBlog;
};

const remove = async (id, token) => {
  const headers = getHeaders(token);
  const response = await axios.delete(`${baseUrl}/${id}`, headers);

  return response.data;
};

const updateLikes = async (id, likes, token) => {
  const headers = getHeaders(token);
  const response = await axios.put(`${baseUrl}/${id}`, likes, headers);

  const updatedBlog = await getById(response.data.id);
  return updatedBlog;
};

export default { getAll, create, remove, updateLikes };
