import api from './base.api';

const listPokemon = () => {
  return api.get('pokemon');
};

export const pokemonAPI = {
  listPokemon,
};
