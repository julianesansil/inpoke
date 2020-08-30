export interface PaginatedPokemonResponse {
  next: string;
  results: {
    name: string;
    url: string;
  }[];
}

class PaginatedPokemonEntity {
  next: string;

  results: {
    id: number | null;
    name: string;
  }[];

  constructor(response: PaginatedPokemonResponse) {
    this.next = response.next;

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

    return id || null;
  };
}

export default PaginatedPokemonEntity;
