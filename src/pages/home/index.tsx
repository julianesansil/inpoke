import React, { FunctionComponent, useEffect } from 'react';
import { pokemonAPI } from '../../services/api/pokemon.api';

const Home: FunctionComponent = () => {
  const listPokemon = async () => {
    const pokemons = await pokemonAPI.listPokemon();
    console.log(pokemons);
    const { id } = pokemons.results[0];

    if (id) {
      const pokemon = await pokemonAPI.getPokemon(id);
      console.log(pokemon);
    }
  };

  useEffect(() => {
    listPokemon();
  });

  return <h1>InPoke</h1>;
};

export default Home;
