import api from './base.api';

const BASE_URL = 'pokemon';

const listPokemon = () => {
  return api.get(BASE_URL);
};

const getPokemon = (id: number) => {
  const url = `${BASE_URL}/${id}`;
  return api.get(url);
};

export const pokemonAPI = {
  listPokemon,
  getPokemon,
};
