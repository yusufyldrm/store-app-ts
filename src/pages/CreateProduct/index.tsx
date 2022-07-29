import React from 'react';
import { useNavigate } from 'react-router-dom';
import Meta from 'helpers/Meta';
import {
  TextInput,
  Dropdown,
  Button
} from 'components';
import {
  Wrapper,
  Title,
  Container
} from './style';
import { createProduct } from 'store/actions/products';
import { ICategoryState, IProcutsState, RootState } from 'interfaces';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

interface INewProductState {
  name: {
    value: string;
    error: string;
  },
  description: {
    value: string;
    error: string;
  },
  avatar: {
    value: string;
    error: string;
  },
  category: {
    value: string;
    error: string;
  },
  price: {
    value: number;
    error: string;
  },
  developerEmail: {
    value: string;
    error: string;
  },
  [key: string]: any
};

const PRODUCT: INewProductState = {
  name: { value: '', error: '' },
  description: { value: '', error: '' },
  avatar: { value: '', error: '' },
  category: { value: '', error: '' },
  price: { value: 0, error: '' },
  developerEmail: { value: 'yusuffyldrm1@gmail.com', error: '' }
};

const CreateProduct: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector<ICategoryState>((state: RootState) => state.categories);
  const { newProduct: { isLoading: isProcess } } = useAppSelector<IProcutsState>((state: RootState) => state.products);
  const [product, setProduct] = React.useState<INewProductState>(PRODUCT);

  const handleInput = (name: string, val: string | number) => {
    setProduct({ ...product, [name]: { value: val, error: '' } });
  };

  const handleSubmit = async () => {
    const errors: {
      name?: string,
      description?: string,
      avatar?: string,
      category?: string,
      price?: string,
      developerEmail?: string,
      [key: string]: any
    } = {};

    Object.keys(product).forEach((key: string) => {
      if (product[key].value.length === 0 || product[key].value <= 0) {
        errors[key] = 'This field is required';
      }
    });
    console.log(errors);
    if (Object.keys(errors).length) {
      Object.keys(errors).forEach(key => {
        setProduct(p => ({ ...p, [key]: { ...p[key], error: errors[key] } }));
      });
      return;
    }
    const payload = {
      name: product.name.value,
      description: product.description.value,
      avatar: product.avatar.value,
      category: product.category.value,
      price: product.price.value,
      developerEmail: product.developerEmail.value
    };

    await dispatch(createProduct(payload)).then((status: boolean) => {
      status && navigate('/');
    });
  };

  return (
    <Wrapper>
      <Meta
        title={'Create Product'}
      />
      <Title>Create Product</Title>
      <Container>
        <TextInput
          id='name'
          autoComplete='off'
          type='text'
          label='Name'
          placeholder='Product Name'
          onChange={(e) => handleInput('name', e.target.value)}
          value={product.name.value}
          error={product.name.error}
          required
        />

        <TextInput
          as={'textarea'}
          id='description'
          type='text'
          label='Description'
          placeholder='Describe Your Product'
          onChange={(e) => handleInput('description', e.target.value)}
          value={product.description.value}
          error={product.description.error}
          required
        />

        <TextInput
          id='avatar'
          type='text'
          label='Image'
          placeholder='Product Image Url'
          onChange={(e) => handleInput('avatar', e.target.value)}
          value={product.avatar.value}
          error={product.avatar.error}
          required
        />

        <Dropdown
          key={'category'}
          label={'Category'}
          defaultValue={'Select Category'}
          options={[...categories.map(category => ({ value: category.name }))]}
          selected={product.category}
          error={product.category.error}
          change={(e) => handleInput('category', e.value)}
        />

        <TextInput
          id='price'
          type='number'
          min='0'
          onBlur={(e: any) => { e.target.value < 0 && handleInput('price', 0); handleInput('price', parseFloat(e.target.value || 0)) }}
          label='Price'
          onChange={(e) => handleInput('price', e.target.value)}
          value={product.price.value.toString()}
          error={product.price.error}
          required
        />

        <Button
          title='Create'
          onClick={handleSubmit}
          isLoading={isProcess}
        />
      </Container>
    </Wrapper>
  )
};

export default CreateProduct;
