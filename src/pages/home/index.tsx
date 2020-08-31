import React, { useEffect, useState, FormEvent } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import PaginatedResponseEntity from '../../models/paginated-response.entity';
import PokemonEntity from '../../models/pokemon.entity';
import { pokemonAPI } from '../../services/api/pokemon.api';
import { typeAPI } from '../../services/api/type.api';

import CardFace from './components/card-face.comp';
import FlipCard from '../../components/flip-card.comp';
import CardBackface from './components/card-backface.comp';

const Home: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonEntity[]>([]);
  const [types, setTypes] = useState<PaginatedResponseEntity['results']>([]);

  const [isFilterOn, setIsFilterOn] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>();
  const [hasMore, setHasMore] = useState<boolean>(true);

  const listPokemon = async () => {
    const pokemonPromises: Promise<PokemonEntity>[] = [];

    const pokemonList = await pokemonAPI.listPokemon();
    pokemonList.results.forEach(
      result =>
        result.id && pokemonPromises.push(pokemonAPI.getPokemon(result.id)),
    );
    setHasMore(!!pokemonList.next);

    try {
      const pokemonData = await Promise.all(pokemonPromises);
      setPokemons([...pokemons, ...pokemonData]);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  // const listType = async () => {
  //   try {
  //     const typeList = await typeAPI.listType();
  //     setTypes(typeList.results);
  //   } catch (error) {
  //     console.log('error: ', error);
  //   }
  // };

  // const listPokemonByType = async (typeId: number) => {
  //   setIsFilterOn(true);
  //   const pokemonPromises: Promise<PokemonEntity>[] = [];

  //   const pokemonList = await typeAPI.listPokemonByType(typeId);
  //   pokemonList.pokemons.forEach(
  //     pokemon =>
  //       pokemon.id && pokemonPromises.push(pokemonAPI.getPokemon(pokemon.id)),
  //   );

  //   try {
  //     const pokemonData = await Promise.all(pokemonPromises);
  //     setPokemons([...pokemons, ...pokemonData]);
  //   } catch (error) {
  //     console.log('error: ', error);
  //   }
  // };

  // const searchPokemon = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setIsFilterOn(true);

  //   if (searchText) {
  //     try {
  //       const pokemonData = await pokemonAPI.getPokemon(searchText);
  //       setPokemons([pokemonData]);
  //     } catch (error) {
  //       console.log('error: ', error);
  //     }
  //   }
  // };

  useEffect(() => {
    listPokemon();
    // listType();
  }, []);

  // useEffect(() => {
  //   if (!searchText?.trim()) {
  //     setIsFilterOn(false);
  //   }
  // }, [searchText]);

  return (
    <div>
      {/* <form onSubmit={searchPokemon}>
        <input
          type="text"
          name="name"
          placeholder="Digite o texto"
          onChange={e => setSearchText(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {types.map(
        type =>
          !!type.id && (
            <div key={type.id}>
              <p>{type.name}</p>
            </div>
          ),
      )} */}

      <InfiniteScroll
        pageStart={0}
        loadMore={listPokemon}
        hasMore={isFilterOn ? false : hasMore}
        loader={<h4 key={0}>Loading...</h4>}
      >
        {pokemons.map(pokemon => (
          <FlipCard
            key={pokemon.id}
            cardFaceComponent={<CardFace pokemon={pokemon} />}
            // cardFaceComponent={<CardBackface pokemon={pokemon} />}
            cardBackfaceComponent={<CardBackface pokemon={pokemon} />}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Home;
