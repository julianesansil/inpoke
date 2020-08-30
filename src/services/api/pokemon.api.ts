import { baseAPI } from './base.api';
import PaginatedPokemonEntity, {
  PaginatedPokemonResponse,
} from '../../models/paginated-pokemon.entity';
import PokemonEntity, { PokemonResponse } from '../../models/pokemon.entity';

const BASE_URL = 'pokemon';
const LIMIT = 20;
let offset = 0;

const listPokemon = async (): Promise<PaginatedPokemonEntity> => {
  const response = await baseAPI.get<PaginatedPokemonResponse>(BASE_URL, {
    params: {
      limit: LIMIT,
      offset,
    },
  });
  offset += LIMIT;

  return new PaginatedPokemonEntity(response);
};

const getPokemon = async (id: number): Promise<PokemonEntity> => {
  const url = `${BASE_URL}/${id}`;
  const response = await baseAPI.get<PokemonResponse>(url);
  return new PokemonEntity(response);
};

export const pokemonAPI = {
  listPokemon,
  getPokemon,
};
