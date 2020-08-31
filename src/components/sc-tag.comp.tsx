import styled from 'styled-components';

interface SCTagProps {
  backgroundColor: string;
}

const SCTag = styled.p<SCTagProps>`
  display: inline;
  margin-right: 5px;
  padding: 5px 15px;

  border: none;
  border-radius: 4px;
  color: white;
  font-size: 0.9em;

  background-color: ${(props: SCTagProps) => props.backgroundColor};

  &:last-child {
    margin-right: 0;
  }
`;

export default SCTag;
