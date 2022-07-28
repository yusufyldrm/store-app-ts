import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

type TypeProp = {
  m?: string;
}

export const LoaderWrapper = styled.div<TypeProp>`
  .spinner {
    display: inline-block;
    line-height: 1;
    margin: ${({ m }) => m ? m : '0 0 0 10px'};
    text-align: center;
    animation: ${spin} 3s infinite linear;
    -webkit-animation: ${spin} 3s infinite linear;
  }
`;
