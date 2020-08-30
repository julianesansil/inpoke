const getId = (url: string) => {
  const idString: string = url.split('/pokemon/')[1]?.replace('/', '');
  const id: number = parseInt(idString, 10);

  return id >= 1 && id <= 893 ? id : null;
};

const getImageURL = (id: number) => {
  const imageName = `${String(id).padStart(3, '0')}.png`;
  const imagePath = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${imageName}`;

  return imagePath;
};

export const pokemonHelper = {
  getId,
  getImageURL,
};
