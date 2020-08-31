import styled from 'styled-components';
import SharedSCButton from '../../../components/button.style';
import SharedSCInput from '../../../components/input.style';

export const SCMain = styled.main``;

export const SCForm = styled.form`
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 726px) {
    width: 660px;
  }
`;

export const SCButton = styled(SharedSCButton)`
  width: 100%;
  margin-top: 10px;

  @media (min-width: 726px) {
    width: 20%;
    margin-top: 0;
    margin-left: 10px;
  }
`;

export const SCInput = styled(SharedSCInput)`
  width: 100%;

  @media (min-width: 726px) {
    width: 70%;
  }
`;
