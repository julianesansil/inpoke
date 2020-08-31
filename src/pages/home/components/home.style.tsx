import styled from 'styled-components';
import SharedSCButton from '../../../components/button.style';
import SharedSCInput from '../../../components/input.style';

export const SCMain = styled.main`
  margin-bottom: 70px;
`;

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

export const SCInput = styled(SharedSCInput)<{ hasError: boolean }>`
  width: 100%;
  border-color: ${(props: { hasError: boolean }) =>
    props.hasError ? '#c91c23' : '#4f6cf6'};

  @media (min-width: 726px) {
    width: 70%;
  }
`;

export const SCError = styled.p`
  margin-top: 10px;
  color: #c91c23;
  text-align: center;
`;

export const SCFinalSentence = styled.p`
  margin-top: 30px;
  font-style: italic;
  font-size: 1.1em;
  text-align: center;
`;
