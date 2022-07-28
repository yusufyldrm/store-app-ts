import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Meta from 'helpers/Meta';
import { Loader } from 'components';
import { Product, Filter } from './components';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getAllProducts } from 'store/actions/products';
import {
  ICategoryState,
  IProcutsState,
  IProduct,
  RootState
} from 'interfaces';
import { ProductsContainer, BottomButton } from './style';

const Home: React.FC = () => {
  const loc = useLocation();
  const query = new URLSearchParams(loc.search);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { products: storeProducts, isLoading: isProdsLoading, error: prodsError } = useAppSelector<IProcutsState>((state) => state.products);
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [searchCategory, setSearchCategory] = React.useState<{ value: string }>({ value: 'All' });
  const [searchName, setSearchName] = React.useState<string>('');
  const { categories } = useAppSelector<ICategoryState>((state: RootState) => state.categories);

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
    console.log(prodsError);
    !isProdsLoading && await dispatch(getAllProducts());
  };

  if (isProdsLoading)
    return <Loader />;

  // if (prodsError.status)
  //   return <ProductsContainer><p>Error: {prodsError.message}</p></ProductsContainer>;

  return (
    <>
      <Meta
      />
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
            key={product.id}
            idx={product.id}
            name={product.name}
            price={product.price}
            avatar={product.avatar}
            searchText={searchName}
          />
        ))
          :
          <div>No products</div>
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
