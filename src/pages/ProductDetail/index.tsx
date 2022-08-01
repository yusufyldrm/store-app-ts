import React from 'react';
import NotFound from 'pages/NotFound';
import { useParams } from 'react-router-dom';
import { Loader, Button } from 'components';
import { priceParser, getFriction } from 'helpers';
import Meta from 'helpers/Meta';
import { VscError as ImageErrorIcon } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import {
  IProcutsState,
  RootState
} from 'interfaces';
import {
  useAppDispatch,
  useAppSelector
} from 'hooks/redux';
import {
  getSingleProductById,
  deleteProductById
} from 'store/actions/products';
import {
  Wrapper,
  Container,
  ImageContainer,
  Overlay,
  Details,
  DetailsContent,
  ProductImage,
  Name,
  Category,
  Price,
  PriceFriction,
  ImgPlaceholder,
  Seperator,
  SubTitle,
  Description,
  Breadcrumb,
  BreadcrumbName,
  BreadcrumbLink
} from './style';

const overlayVariants = {
  initial: {
    opacity: 0,
    transition: {
      type: 'spring',
      duration: 0.5
    },
    transitionEnd: {
      display: 'none'
    }
  },
  animate: {
    display: 'block',
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 120
    }
  }
};

const ImagePlaceholder = () => <ImgPlaceholder><ImageErrorIcon size={'80%'} color={'#212121'} /></ImgPlaceholder>;

const ProductDetail: React.FC = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [imageError, setImageError] = React.useState(false);
  const [isOpen, setOpen] = React.useState(false);
  const {
    singleProduct: { data: product, error, isLoading },
    deleteProduct: { isLoading: isDeleteLoading, error: deleteError }
  } = useAppSelector<IProcutsState>((state: RootState) => state.products);

  React.useEffect(() => {
    if (productId)
      getProduct(productId);
    // eslint-disable-next-line
  }, [productId]);

  const getProduct = async (id: string) => {
    await dispatch(getSingleProductById(id));
  };

  const deleteProduct = async () => {
    if (!productId) return;
    dispatch(deleteProductById(productId)).then((status: boolean) => {
      if (status)
        return navigate('/');
      console.log(':: delete error', deleteError.message);
    });
  };

  if (isLoading) {
    return (
      <Loader iconSize={'50px'} />
    );
  }

  if (product === null || error.status) {
    return <NotFound message={error.message} />;
  };

  return (
    <Wrapper>
      <Meta
        title={product.name}
        description={product.description}
        image={product.avatar}
      />
      <Breadcrumb>
        <BreadcrumbLink to={'/'}>Home</BreadcrumbLink>
        <span style={{ margin: '0 5px', userSelect: 'none' }}>/</span>
        <BreadcrumbLink to={`/?category=${product.category}`}>{product.category}</BreadcrumbLink>
        <span style={{ margin: '0 5px', userSelect: 'none' }}>/</span>
        <BreadcrumbName>{product.name}</BreadcrumbName>
      </Breadcrumb>
      <Container>
        <ImageContainer $isOpen={isOpen}>
          <Overlay
            variants={overlayVariants}
            initial='initial'
            animate={isOpen ? 'animate' : 'initial'}
            onClick={() => setOpen(false)}
          />
          <ProductImage
            src={product.avatar}
            alt={product.name}
            onClick={() => setOpen(!isOpen)}
            onError={(e: any) => { e.target.style = 'display: none'; setImageError(true) }}
            loading='lazy'
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30
            }}
          />
          {imageError && <ImagePlaceholder />}
        </ImageContainer>

        <Details>
          <DetailsContent>
            <div>
              <Name>{product.name}</Name>
              <Category to={`/?category=${product.category}`}>{product.category}</Category>
            </div>
            <Price>
              <PriceFriction>$</PriceFriction>
              <strong>{priceParser(product.price)}</strong>
              <PriceFriction>{getFriction(product.price)}</PriceFriction>
            </Price>
          </DetailsContent>
        </Details>
      </Container>
      <Seperator />

      <SubTitle>Description</SubTitle>
      <Description>{product.description}</Description>

      <Button
        title={'Delete Product'}
        onClick={deleteProduct}
        isLoading={isDeleteLoading}
        style={{ width: 'auto', float: 'right' }}
        bg={'#f44336'}
        textColor={'#fff'}
      />
    </Wrapper>
  )
};

export default ProductDetail;
