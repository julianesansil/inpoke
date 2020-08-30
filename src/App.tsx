import React, { FunctionComponent } from 'react';
import Home from './pages/home';
import GlobalStyle from './global-styles';

const App: FunctionComponent = () => {
  return (
    <>
      <Home />
      <GlobalStyle />
    </>
  );
};

export default App;
