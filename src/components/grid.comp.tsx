import React from 'react';
import styled from 'styled-components';

interface GridProps {
  children: JSX.Element | JSX.Element[];
}

const SCContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, auto));
  gap: 20px;

  justify-content: center;
  align-items: center;
`;

const Grid: React.FC<GridProps> = (props: GridProps) => {
  const { children } = props;

  return <SCContainer>{children}</SCContainer>;
};

export default Grid;
