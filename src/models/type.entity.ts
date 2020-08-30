/* eslint-disable camelcase */

import { urlHelper } from '../services/helpers/url.helper';
import ENTITY from './entity.enum';

export interface TypeResponse {
  pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
}

class TypeEntity {
  pokemons: {
    id: number | null;
    name: string;
  }[];

  constructor(response: TypeResponse) {
    this.pokemons = response.pokemon.map(pokemonResponse => {
      return {
        id: urlHelper.getId(pokemonResponse.pokemon.url, ENTITY.POKEMON),
        name: pokemonResponse.pokemon.name,
      };
    });
  }
}

export default TypeEntity;
