import React from 'react';
import { Button } from 'components';
import {
  Wrapper,
  LinkArea,
  ErrorText
} from './style';

const NotFound: React.FC<{ message?: string }> = ({
  message
}) => {
  return (
    <Wrapper>
      <h1>404 | Not Found</h1>
      {message && <ErrorText>{message}</ErrorText>}
      <LinkArea to={'/'}>
        <Button
          title={'Go to Home'}
          style={{ width: 'auto', margin: 0 }}
        />
      </LinkArea>
    </Wrapper>
  )
};

export default NotFound;
