import React, { useEffect, useState, FormEvent } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import PokemonEntity from '../../models/pokemon.entity';
import { pokemonAPI } from '../../services/api/pokemon.api';

import Grid from '../../components/grid.comp';
import FlipCard from '../../components/flip-card.comp';
import Loader from '../../components/loader.comp';

import { SCMain, SCForm, SCButton, SCInput } from './components/home.style';
import Header from './components/header.comp';
import CardFace from './components/card-face.comp';
import CardBackface from './components/card-backface.comp';

let loadedPokemons: PokemonEntity[] = [];

const Home: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonEntity[]>([]);

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
      loadedPokemons = [...pokemons, ...pokemonData];
      setPokemons(loadedPokemons);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const searchPokemon = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFilterOn(true);

    if (searchText) {
      try {
        const pokemonData = await pokemonAPI.getPokemon(searchText);
        setPokemons([pokemonData]);
      } catch (error) {
        console.log('error: ', error);
      }
    }
  };

  useEffect(() => {
    listPokemon();
  }, []);

  useEffect(() => {
    if (!searchText?.trim()) {
      setIsFilterOn(false);
      setPokemons(loadedPokemons);
    }
  }, [searchText]);

  return (
    <div>
      <Header>
        <SCForm onSubmit={searchPokemon}>
          <SCInput
            type="text"
            placeholder="Who is that pokémon?"
            onChange={e => setSearchText(e.target.value)}
          />
          <SCButton type="submit">Catch</SCButton>
        </SCForm>
      </Header>

      <SCMain>
        <InfiniteScroll
          pageStart={0}
          loadMore={listPokemon}
          hasMore={isFilterOn ? false : hasMore}
          loader={<Loader key={0} />}
        >
          <Grid>
            {pokemons.map(pokemon => (
              <FlipCard
                key={pokemon.id}
                cardFaceComponent={<CardFace pokemon={pokemon} />}
                cardBackfaceComponent={<CardBackface pokemon={pokemon} />}
              />
            ))}
          </Grid>
        </InfiniteScroll>
      </SCMain>
    </div>
  );
};

export default Home;
