import React from 'react';
import PreLoader from '../PreLoader';
import { LoaderContainer } from './style';

interface ILoaderProps {
  iconSize?: string;
};

const Loader: React.FC<ILoaderProps> = ({
  iconSize
}) => {
  return (
    <LoaderContainer>
      <PreLoader
        size={iconSize}
        strokeWidth='3'
      />
    </LoaderContainer>
  )
};

Loader.defaultProps = {
  iconSize: '50px',
};

export default Loader;
