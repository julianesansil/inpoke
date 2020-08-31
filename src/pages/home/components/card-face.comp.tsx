import React from 'react';
import styled from 'styled-components';

import PokemonEntity from '../../../models/pokemon.entity';
import SCTag from '../../../components/tag.style';
import TAG_COLORS from '../../../config/tag-colors';

interface CardFaceProps {
  pokemon: PokemonEntity;
}

const SCContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;
`;

const SCImage = styled.img`
  height: 100px;
`;

const SCTitle = styled.p`
  margin-top: 12px;
  font-size: 1.1em;
  text-transform: capitalize;
`;

const SCTags = styled.div`
  margin-top: 10px;
`;

const CardFace: React.FC<CardFaceProps> = (props: CardFaceProps) => {
  const { pokemon } = props;

  return (
    <SCContainer>
      <SCImage src={pokemon.imageURL} alt={pokemon.name} />

      <SCTitle>{`${pokemon.name} | ${pokemon.hp} HP`}</SCTitle>

      <SCTags>
        {pokemon.types.map(type => (
          <SCTag key={type} backgroundColor={TAG_COLORS[type]}>
            {type}
          </SCTag>
        ))}
      </SCTags>
    </SCContainer>
  );
};

export default CardFace;
