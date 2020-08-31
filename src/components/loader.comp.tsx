import React from 'react';
import styled, { keyframes } from 'styled-components';
import pokebola from '../assets/images/pokebola.svg';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SCContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 40px 0;
`;

const SCImage = styled.img`
  width: 30px;
  animation: ${rotate} 1s linear infinite;
`;

const Loader: React.FC = () => {
  return (
    <SCContainer>
      <SCImage src={pokebola} alt="Loading..." />
    </SCContainer>
  );
};

export default Loader;
