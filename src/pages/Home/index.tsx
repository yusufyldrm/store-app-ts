import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Meta from 'helpers/Meta';
import { Loader, Button } from 'components';
import { Product, Filter } from './components';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getAllProducts } from 'store/actions/products';
import { getAllCategories } from 'store/actions/categories';
import {
  ICategoryState,
  IProcutsState,
  IProduct,
  RootState
} from 'interfaces';
import {
  ProductsContainer,
  BottomButton,
  ErrorContainer
} from './style';

const Home: React.FC = () => {
  const loc = useLocation();
  const query = new URLSearchParams(loc.search);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { products: storeProducts, isLoading: isProdsLoading, error: prodsError } = useAppSelector<IProcutsState>((state) => state.products);
  const { categories } = useAppSelector<ICategoryState>((state: RootState) => state.categories);
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [searchCategory, setSearchCategory] = React.useState<{ value: string }>({ value: 'All' });
  const [searchName, setSearchName] = React.useState<string>('');

  React.useEffect(() => {
    init();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (!!query.get('category') && query.get('category') !== 'all') {
      setSearchCategory({ value: query.get('category') || 'All' });
    } else if (query.get('category') === null) {
      setSearchCategory({ value: 'All' });
    }
    // eslint-disable-next-line
  }, [query.get('category')]);

  const init = async () => {
    !isProdsLoading && await dispatch(getAllProducts());
  };

  const refresh = async () => {
    await dispatch(getAllCategories());
    await dispatch(getAllProducts());
  };

  if (isProdsLoading)
    return <Loader />;

  if (prodsError.status)
    return <ErrorContainer>
      <p>Something went wrong.</p>
      <Button
        title={'Refresh'}
        onClick={refresh}
        style={{ width: 'auto' }}
      />
    </ErrorContainer>;

  return (
    <>
      <Meta />
      <Filter
        immutableProducts={storeProducts}
        setProducts={(prods) => setProducts(prods)}
        searchCategory={searchCategory}
        searchName={searchName}
        setSearchCategory={(category) => setSearchCategory(category)}
        setSearchName={(name) => setSearchName(name)}
        categories={categories}
      />

      <ProductsContainer>
        {products.length > 0 ? products.map((product) => (
          <Product
            key={product._id}
            idx={product._id}
            name={product.name}
            price={product.price}
            avatar={product.avatar}
            searchText={searchName}
          />
        ))
          :
          <ErrorContainer>
            <p>{(searchName || searchCategory.value !== 'All') ? 'There are no products' : 'No Product'}</p>
          </ErrorContainer>
        }
      </ProductsContainer>

      <BottomButton
        onClick={() => navigate('/create-product')}
        whileTap={{ scale: 0.9 }}
        whileHover={{
          scale: 1.1,
          transition: {
            type: 'spring',
            duration: 1,
            stiffness: 100
          },
        }}
      >
        +
      </BottomButton>
    </>
  )
};

export default Home;
