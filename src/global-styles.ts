import { createGlobalStyle } from 'styled-components';
import MontserratRegular from './assets/fonts/Montserrat-Regular.ttf';
import MontserratBold from './assets/fonts/Montserrat-Bold.ttf';
import PokemonSolid from './assets/fonts/Pokemon-Solid.ttf';

export default createGlobalStyle`
  @font-face {
    font-family: 'Pokemon';
    src: url(${PokemonSolid}) format('truetype');
  }

  @font-face {
    font-family: 'Montserrat';
    src: url(${MontserratRegular}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Montserrat';
    src: url(${MontserratBold}) format('truetype');
    font-weight: bold;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    border: 0;
    
    box-sizing: border-box;
    font: inherit;
    font-size: 100%;
    vertical-align: baseline;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    line-height: 1.5;
  }

  #root {
    padding-left: 5%;
    padding-right: 5%;

    @media (min-width: 1066px) {
      padding-left: calc((100% - 960px) / 2);
      padding-right: calc((100% - 960px) / 2);
    }

    @media (min-width: 1440px) {
      padding-left: calc((100% - 1200px) / 2);
      padding-right: calc((100% - 1200px) / 2);
    }
  }
`;
