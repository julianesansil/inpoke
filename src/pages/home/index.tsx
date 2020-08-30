import React, { FunctionComponent, useEffect } from 'react';
import { pokemonAPI } from '../../services/api/pokemon.api';

const Home: FunctionComponent = () => {
  const listPokemon = async () => {
    const response = await pokemonAPI.listPokemon();
    console.log(response.data);
  };

  useEffect(() => {
    listPokemon();
  });

  return <h1>InPoke</h1>;
};

export default Home;
