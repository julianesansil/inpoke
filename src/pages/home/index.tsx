import React, { FunctionComponent, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { pokemonAPI } from '../../services/api/pokemon.api';
import PokemonEntity from '../../models/pokemon.entity';

let hasMore = true;

const Home: FunctionComponent = () => {
  const [pokemons, setPokemons] = useState<PokemonEntity[]>([]);

  const listPokemon = async () => {
    const pokemonPromises: Promise<PokemonEntity>[] = [];
    const pokemonsList = await pokemonAPI.listPokemon();
    hasMore = !!pokemonsList.next;

    pokemonsList.results.forEach(result => {
      if (result.id) {
        pokemonPromises.push(pokemonAPI.getPokemon(result.id));
      }
    });

    try {
      const pokemonsData = await Promise.all(pokemonPromises);
      setPokemons([...pokemons, ...pokemonsData]);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    listPokemon();
  }, []);

  return (
    <div>
      <InfiniteScroll
        pageStart={0}
        loadMore={listPokemon}
        hasMore={hasMore}
        loader={<h4 key={0}>Loading...</h4>}
      >
        {pokemons.map(pokemon => (
          <div key={pokemon.id}>
            <h1>{pokemon.name}</h1>
            <p>{pokemons.length}</p>
            <p>{pokemon.baseExperience}</p>
            <p>{pokemon.types.join(', ')}</p>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Home;
