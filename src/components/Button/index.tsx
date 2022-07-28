import React from 'react';
import PreLoader from '../PreLoader';
import { Wrapper } from './style';

interface IButtonProps {
  title: string;
  icon?: React.FC;
  iconProps?: object;
  isLoading?: boolean;
  bg?: string;
  radius?: number;
  pd?: string;
  children?: React.ReactNode;
  [others: string]: any;
};

const Button: React.FC<IButtonProps> = ({
  title,
  icon: Icon,
  iconProps,
  isLoading,
  children,
  textColor,
  ...props
}) => {
  return (
    <Wrapper
      disabled={isLoading}
      whileTap={{ scale: 0.95 }}
      whileHover={{
        scale: 1.02,
        transition: {
          type: 'spring',
          duration: 1,
          stiffness: 100
        },
      }}
      $textColor={textColor}
      {...props}
    >
      {isLoading ? <PreLoader /> : (children ? children : <p>{title}</p>)}
      {Icon && <Icon {...iconProps} />}
    </Wrapper>
  )
};

Button.defaultProps = {
  title: '',
  iconProps: {},
  isLoading: false,
  bg: '#fff',
  radius: 10,
  pd: '15px',
  textColor: '#212121',
  children: null
};

export default Button;
