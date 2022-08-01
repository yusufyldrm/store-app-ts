import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LinkArea = styled(Link)`
  margin-top: 20px;
`;

export const ErrorText = styled.p`
  margin-top: 20px;
`;
