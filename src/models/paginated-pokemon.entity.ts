export interface PaginatedPokemonResponse {
  results: {
    name: string;
    url: string;
  }[];
}

class PaginatedPokemonEntity {
  results: {
    id: number | null;
    name: string;
  }[];

  constructor(response: PaginatedPokemonResponse) {
    this.results = response.results.map(resultResponse => {
      return {
        id: this.getId(resultResponse.url),
        name: resultResponse.name,
      };
    });
  }

  getId = (url: string): number | null => {
    const idString: string = url.split('/pokemon/')[1]?.replace('/', '');
    const id: number = parseInt(idString, 10);

    return id >= 1 && id <= 893 ? id : null;
  };
}

export default PaginatedPokemonEntity;
