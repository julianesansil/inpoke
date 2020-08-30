/* eslint-disable camelcase */

export interface PokemonResponse {
  id: number;
  name: string;
  baseExperience: number;

  abilities: {
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }[];
  forms: {
    name: string;
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
}

class PokemonEntity {
  id: number;

  name: string;

  baseExperience: number;

  imageURL: string;

  abilities: {
    name: string;
    isHidden: boolean;
  }[];

  forms: string[];

  stats: {
    name: string;
    percentage: number;
  }[];

  types: string[];

  constructor(response: PokemonResponse) {
    this.id = response.id;
    this.name = response.name;
    this.baseExperience = response.baseExperience;
    this.imageURL = this.getImageURL(response.id);

    this.abilities = response.abilities.map(abilityResponse => {
      return {
        name: abilityResponse?.ability?.name,
        isHidden: abilityResponse?.is_hidden,
      };
    });

    this.forms = response.forms.map(formResponse => formResponse?.name);

    this.stats = response.stats.map(statResponse => {
      return {
        name: statResponse?.stat?.name,
        percentage: statResponse?.base_stat,
      };
    });

    this.types = response.types.map(typeResponse => typeResponse?.type?.name);
  }

  getImageURL = (id: number): string => {
    const imageName = `${String(id).padStart(3, '0')}.png`;
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${imageName}`;
  };
}

export default PokemonEntity;
