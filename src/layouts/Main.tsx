import React from 'react';
import Header from 'components/Header';

interface IMainProps {
  children: React.ReactNode;
};

const Main: React.FC<IMainProps> = ({
  children
}) => {

  return (
    <main>
      <Header />
      {children}
    </main>
  )
}

export default Main;
