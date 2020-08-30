import React, { FunctionComponent, useEffect, useState } from 'react';
import { pokemonAPI } from '../../services/api/pokemon.api';
import PokemonEntity from '../../models/pokemon.entity';

const Home: FunctionComponent = () => {
  const [pokemons, setPokemons] = useState<PokemonEntity[]>([]);

  const listPokemon = async () => {
    const pokemonPromises: Promise<PokemonEntity>[] = [];

    const pokemonsReponse = await pokemonAPI.listPokemon();
    pokemonsReponse.results.forEach(result => {
      if (result.id) {
        pokemonPromises.push(pokemonAPI.getPokemon(result.id));
      }
    });

    setPokemons(await Promise.all(pokemonPromises));
  };

  useEffect(() => {
    listPokemon();
  }, []);

  return (
    <div>
      {pokemons.map(pokemon => (
        <div key={pokemon.id}>
          <h1>{pokemon.name}</h1>
          <p>{pokemon.baseExperience}</p>
          <p>{pokemon.types.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
