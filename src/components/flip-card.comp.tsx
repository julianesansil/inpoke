import React from 'react';
import styled from 'styled-components';

type FlipCardProps = {
  cardFaceComponent: JSX.Element;
  cardBackfaceComponent: JSX.Element;
} & FlipCardStyles;

interface FlipCardStyles {
  height?: number;
  width?: number;
}

const SCInner = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

  border: #000 solid 1px;
  border-radius: 10px;

  transition: transform 0.6s;
  transform-style: preserve-3d;
`;

const SCContainer = styled.div<FlipCardStyles>`
  ${(props: FlipCardStyles) => `
    height: ${props.height}px;
    width: ${props.width}px;
  `}

  &:hover ${SCInner} {
    transform: rotateY(180deg);
  }
`;

const SCCardBody = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;

  overflow: scroll;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
`;

const SCFace = styled(SCCardBody)`
  padding: 30px;
`;

const SCBackface = styled(SCCardBody)`
  padding: 14px;
  background-color: #fff;
  border-radius: 10px;

  transform: rotateY(180deg);
`;

const FlipCard: React.FC<FlipCardProps> = (props: FlipCardProps) => {
  const {
    cardFaceComponent,
    cardBackfaceComponent,
    height = 250,
    width = 250,
  } = props;

  return (
    <SCContainer height={height} width={width}>
      <SCInner>
        <SCFace>{cardFaceComponent}</SCFace>
        <SCBackface>{cardBackfaceComponent}</SCBackface>
      </SCInner>
    </SCContainer>
  );
};

export default FlipCard;
