import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

const get = async <T>(
  url: string,
  config?: AxiosRequestConfig | undefined,
): Promise<T> => {
  const response = await api.get<T>(url, config);
  return response.data;
};

export const baseAPI = {
  get,
};
