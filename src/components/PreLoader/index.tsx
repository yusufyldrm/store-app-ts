import React from 'react';
import { FiLoader as LoaderIcon } from 'react-icons/fi';
import { LoaderWrapper } from './style';

interface IPreLoaderProps {
  size?: string;
  title?: string;
  customStyle?: object;
  containerStyle?: object;
  margin?: string;
  color?: string;
  [others: string]: any;
};

const PreLoader: React.FC<IPreLoaderProps> = ({
  size,
  title,
  customStyle,
  containerStyle,
  margin,
  color,
  ...props
}) => {
  return (
    <LoaderWrapper
      m={margin}
      style={containerStyle}
    >
      <LoaderIcon
        className='spinner'
        title={title}
        color={color}
        size={size}
        strokeWidth={props.strokeWidth ? props.strokeWidth : "2"}
        style={customStyle}
        {...props}
      />
    </LoaderWrapper>
  )
};

PreLoader.defaultProps = {
  size: '25px',
  title: 'Loading',
  margin: '0',
  customStyle: {},
  color: '#007CFF'
};

export default PreLoader;
