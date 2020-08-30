import ENTITY from '../../models/entity.enum';

const getId = (url: string, entity: ENTITY): number | null => {
  const idString: string = url.split(`/${entity}/`)[1]?.replace('/', '');
  const id: number = parseInt(idString, 10);

  return id || null;
};

export const urlHelper = {
  getId,
};
