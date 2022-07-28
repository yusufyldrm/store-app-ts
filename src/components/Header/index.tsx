import {
  Wrapper,
  Container,
  Logo,
  Navs
} from './style';

const Header = () => {
  return (
    <Wrapper>
      <Container>
        <Logo to={'/'}>Store App</Logo>

        <Navs>
          <Logo to={'/create-product'}>Register</Logo>
        </Navs>
      </Container>
    </Wrapper>
  )
};

export default Header;
