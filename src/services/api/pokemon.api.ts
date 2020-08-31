import { baseAPI } from './base.api';
import PaginatedResponseEntity, {
  PaginatedResponse,
} from '../../models/paginated-response.entity';
import PokemonEntity, { PokemonResponse } from '../../models/pokemon.entity';
import ENTITY from '../../models/entity.enum';

const BASE_URL = 'pokemon';
const LIMIT = 24;
let offset = 0;

const listPokemon = async (): Promise<PaginatedResponseEntity> => {
  const response = await baseAPI.get<PaginatedResponse>(BASE_URL, {
    params: {
      limit: LIMIT,
      offset,
    },
  });
  offset += LIMIT;

  return new PaginatedResponseEntity(response, ENTITY.POKEMON);
};

const getPokemon = async (
  pokemonKey: number | string,
): Promise<PokemonEntity> => {
  const url = `${BASE_URL}/${pokemonKey}`;
  const response = await baseAPI.get<PokemonResponse>(url);
  return new PokemonEntity(response);
};

export const pokemonAPI = {
  listPokemon,
  getPokemon,
};
