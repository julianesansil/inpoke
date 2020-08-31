import React from 'react';
import styled from 'styled-components';

interface HeaderProps {
  children: JSX.Element;
}

const SCContainer = styled.header`
  padding: 50px 0;
  text-align: center;
`;

const SCTitle = styled.h1`
  color: #c91c23;
  font-family: 'Pokemon';
  font-size: 4em;
`;

const SCSubtitle = styled.h2`
  margin-top: -14px;
  font-size: 1.5em;
  font-weight: bold;
`;

const SCChildren = styled.div`
  margin-top: 40px;
`;

const HeaderTitle: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { children } = props;

  return (
    <SCContainer>
      <SCTitle>InPoke_</SCTitle>
      <SCSubtitle>Gotta catch &apos;em all!</SCSubtitle>

      <SCChildren>{children}</SCChildren>
    </SCContainer>
  );
};

export default HeaderTitle;
