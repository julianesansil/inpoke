/* eslint-disable camelcase */

export interface PokemonResponse {
  id: number;
  name: string;
  base_experience: number;

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

  imageURL: string;

  hp = 0;

  abilities: {
    name: string;
    isHidden: boolean;
  }[];

  forms: string[];

  stats: {
    name: string;
    value: number;
  }[];

  types: string[];

  constructor(response: PokemonResponse) {
    this.id = response.id;
    this.name = response.name;
    this.imageURL = this.getImageURL(response.id);

    this.abilities = response.abilities.map(abilityResponse => {
      return {
        name: abilityResponse?.ability?.name,
        isHidden: abilityResponse?.is_hidden,
      };
    });

    this.forms = response.forms.map(formResponse => formResponse?.name);

    this.stats = response.stats.map(statResponse => {
      if (statResponse.stat.name === 'hp') {
        this.hp = statResponse.base_stat;
      }

      return {
        name: statResponse?.stat?.name,
        value: statResponse?.base_stat,
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
