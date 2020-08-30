import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

const get = async <T>(url: string): Promise<T> => {
  const response = await api.get<T>(url);
  return response.data;
};

export const baseAPI = {
  get,
};
