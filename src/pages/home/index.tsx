import React, {
  FunctionComponent,
  useEffect,
  useState,
  FormEvent,
} from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { pokemonAPI } from '../../services/api/pokemon.api';
import PokemonEntity from '../../models/pokemon.entity';

let hasMore = true;

const Home: FunctionComponent = () => {
  const [pokemons, setPokemons] = useState<PokemonEntity[]>([]);

  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>();

  const listPokemon = async () => {
    const pokemonPromises: Promise<PokemonEntity>[] = [];

    const pokemonList = await pokemonAPI.listPokemon();
    pokemonList.results.forEach(
      result =>
        result.id && pokemonPromises.push(pokemonAPI.getPokemon(result.id)),
    );
    hasMore = !!pokemonList.next;

    try {
      const pokemonData = await Promise.all(pokemonPromises);
      setPokemons([...pokemons, ...pokemonData]);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    listPokemon();
  }, []);

  useEffect(() => {
    if (!searchText?.trim()) {
      setIsSearch(false);
    }
  }, [searchText]);

  const searchPokemon = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSearch(true);

    if (searchText) {
      try {
        const pokemonData = await pokemonAPI.getPokemon(searchText);
        setPokemons([pokemonData]);
      } catch (error) {
        console.log('error: ', error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={searchPokemon}>
        <input
          type="text"
          name="name"
          placeholder="Digite o texto"
          onChange={e => setSearchText(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <InfiniteScroll
        pageStart={0}
        loadMore={listPokemon}
        hasMore={isSearch ? false : hasMore}
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
