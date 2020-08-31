import React from 'react';
import styled from 'styled-components';

import PokemonEntity from '../../../models/pokemon.entity';

interface CardBackfaceProps {
  pokemon: PokemonEntity;
}

const SCContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SCTitle = styled.p`
  font-size: 1.1em;
  text-transform: capitalize;
`;

const SCDetailsTable = styled.table`
  width: 100%;
  margin-top: 8px;
`;

const SCDetailItem = styled.td`
  font-size: 0.85em;
  text-transform: capitalize;
`;

const SCStatsTable = styled.table`
  width: 100%;
  margin-top: 10px;
`;

const SCStatItem = styled.td`
  font-size: 0.7em;
  text-transform: capitalize;
`;

const SCProgress = styled.progress`
  background-color: #e6e6e6;
  border-radius: 6px;

  &::-webkit-progress-bar {
    background-color: #e6e6e6;
    border-radius: 6px;
  }
  &::-webkit-progress-value {
    background-color: #4f6cf6;
    border-radius: 6px;
  }
  &::-moz-progress-bar {
    background-color: #4f6cf6;
    border-radius: 6px;
  }
`;

const CardBackface: React.FC<CardBackfaceProps> = (
  props: CardBackfaceProps,
) => {
  const { pokemon } = props;

  return (
    <SCContainer>
      <SCTitle>{pokemon.name}</SCTitle>

      <SCDetailsTable>
        <tbody>
          <tr>
            <SCDetailItem>Forms:</SCDetailItem>
            <SCDetailItem>{pokemon.forms}</SCDetailItem>
          </tr>

          <tr>
            <SCDetailItem>Abilities:</SCDetailItem>

            <SCDetailItem>
              {pokemon.abilities.map((ability, index) => {
                return (
                  <p key={ability.name}>
                    {`${ability.name} ${
                      index < pokemon.abilities.length - 1 ? ' / ' : ''
                    }`}
                  </p>
                );
              })}
            </SCDetailItem>
          </tr>
        </tbody>
      </SCDetailsTable>

      <SCStatsTable>
        <tbody>
          {pokemon.stats.map(stat => (
            <tr key={stat.name}>
              <SCStatItem>{stat.name}</SCStatItem>

              <SCStatItem>
                <SCProgress value={stat.value} max="100" />
              </SCStatItem>
            </tr>
          ))}
        </tbody>
      </SCStatsTable>
    </SCContainer>
  );
};

export default CardBackface;
