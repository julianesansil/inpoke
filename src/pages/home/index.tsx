import React, { FunctionComponent, useEffect } from 'react';
import { pokemonAPI } from '../../services/api/pokemon.api';
import { pokemonHelper } from '../../services/helpers/pokemon.helper';

const Home: FunctionComponent = () => {
  const listPokemon = async () => {
    const pokemons = await pokemonAPI.listPokemon();
    console.log(pokemons.data);
    const { url } = pokemons.data.results[0];
    const id = pokemonHelper.getId(url);

    if (id) {
      const pokemon = await pokemonAPI.getPokemon(id);
      console.log(pokemon.data);
    }
  };

  useEffect(() => {
    listPokemon();
  });

  return <h1>InPoke</h1>;
};

export default Home;
