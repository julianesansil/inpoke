import { baseAPI } from './base.api';
import PaginatedResponseEntity, {
  PaginatedResponse,
} from '../../models/paginated-response.entity';
import TypeEntity, { TypeResponse } from '../../models/type.entity';
import ENTITY from '../../models/entity.enum';

const BASE_URL = 'type';

const listType = async (): Promise<PaginatedResponseEntity> => {
  const response = await baseAPI.get<PaginatedResponse>(BASE_URL);
  return new PaginatedResponseEntity(response, ENTITY.TYPE);
};

const listPokemonByType = async (typeId: number): Promise<TypeEntity> => {
  const url = `${BASE_URL}/${typeId}`;
  const response = await baseAPI.get<TypeResponse>(url);
  return new TypeEntity(response);
};

export const typeAPI = {
  listType,
  listPokemonByType,
};
