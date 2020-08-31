import React, { useEffect, useState, FormEvent } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import PokemonEntity from '../../models/pokemon.entity';
import { pokemonAPI } from '../../services/api/pokemon.api';

import Grid from '../../components/grid.comp';
import FlipCard from '../../components/flip-card.comp';
import Loader from '../../components/loader.comp';

import {
  SCMain,
  SCForm,
  SCButton,
  SCInput,
  SCError,
  SCFinalSentence,
} from './components/home.style';
import Header from './components/header.comp';
import CardFace from './components/card-face.comp';
import CardBackface from './components/card-backface.comp';

let loadedPokemons: PokemonEntity[] = [];

const Home: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonEntity[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [hasListError, setHasListError] = useState<boolean>(false);

  const [isFilterOn, setIsFilterOn] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>();
  const [hasSearchError, setHasSearchError] = useState<boolean>(false);

  const listPokemon = async () => {
    setHasListError(false);
    const pokemonPromises: Promise<PokemonEntity>[] = [];

    try {
      const pokemonList = await pokemonAPI.listPokemon();
      pokemonList.results.forEach(
        result =>
          result.id && pokemonPromises.push(pokemonAPI.getPokemon(result.id)),
      );
      setHasMore(!!pokemonList.next);

      const pokemonData = await Promise.all(pokemonPromises);
      loadedPokemons = [...pokemons, ...pokemonData];
      setPokemons(loadedPokemons);
    } catch (error) {
      setHasListError(true);
    }
  };

  const searchPokemon = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsFilterOn(true);
    setHasSearchError(false);

    if (searchText) {
      try {
        const pokemonData = await pokemonAPI.getPokemon(searchText);
        setPokemons([pokemonData]);
      } catch (error) {
        setHasSearchError(true);
      }
    }
  };

  useEffect(() => {
    listPokemon();
  }, []);

  useEffect(() => {
    if (!searchText?.trim()) {
      setIsFilterOn(false);
      setHasSearchError(false);
      setPokemons(loadedPokemons);
    }
  }, [searchText]);

  return (
    <div>
      <Header>
        <SCForm onSubmit={searchPokemon}>
          <SCInput
            type="text"
            hasError={hasSearchError}
            placeholder="pókemon name or id"
            onChange={e => setSearchText(e.target.value)}
          />
          <SCButton type="submit">Catch</SCButton>

          {hasSearchError && (
            <SCError>Who is that pokémon? (search error)</SCError>
          )}
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
        {hasListError && <SCError>Error loading pokémons :(</SCError>}

        {!hasMore && (
          <SCFinalSentence>
            ... Surrender now, or prepare to fight!
          </SCFinalSentence>
        )}
      </SCMain>
    </div>
  );
};

export default Home;
