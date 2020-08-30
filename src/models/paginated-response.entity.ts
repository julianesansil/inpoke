import ENTITY from './entity.enum';
import { urlHelper } from '../services/helpers/url.helper';

export interface PaginatedResponse {
  next: string;
  results: {
    name: string;
    url: string;
  }[];
}

class PaginatedResponseEntity {
  next: string;

  results: {
    id: number | null;
    name: string;
  }[];

  constructor(response: PaginatedResponse, entity: ENTITY) {
    this.next = response.next;

    this.results = response.results.map(resultResponse => {
      return {
        id: urlHelper.getId(resultResponse.url, entity),
        name: resultResponse.name,
      };
    });
  }
}

export default PaginatedResponseEntity;
