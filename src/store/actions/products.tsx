import type { AppDispatch, RootState } from 'store';
import { INewProduct } from 'interfaces';
import { CATEGORY, PRODUCTS } from '../contants';
import {
  categorizeProducts,
  errorHandler
} from './commons';
import {
  getAllProdcutsAsync,
  getSingleProductAsync,
  createProductAsync,
  deleteProductAsync
} from '../services/product';

export const getAllProducts = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    dispatch({ type: PRODUCTS.GET_ALL_PRODUCTS_REQUEST });

    const { data } = await getAllProdcutsAsync();
    const { categories: { categories } } = getState();

    const categorized = categorizeProducts(data, categories);

    dispatch({
      type: PRODUCTS.GET_ALL_PRODUCTS,
      payload: data
    });

    dispatch({
      type: CATEGORY.GET_CATEGORIES,
      payload: categorized
    });


  } catch (error: any) {
    dispatch({
      type: PRODUCTS.GET_ALL_PRODUCTS_ERROR,
      payload: errorHandler(error)
    });
  }
};

export const getSingleProductById = (id: string) => async (dispatch: AppDispatch) => {
  dispatch({ type: PRODUCTS.GET_SINGLE_PRODUCT_REQUEST });
  try {
    const { data } = await getSingleProductAsync(id);
    // __mock__
    // const data = {
    //   id: 1,
    //   name: 'Product 1',
    //   price: 100,
    //   category: 'Category 1',
    //   description: 'Description 1',
    //   avatar: 'https://via.placeholder.com/150',
    //   developerEmail: ''
    // }

    !data?.category && (data.category = 'Others');

    dispatch({
      type: PRODUCTS.GET_SINGLE_PRODUCT,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: PRODUCTS.GET_SINGLE_PRODUCT_ERROR,
      payload: errorHandler(error)
    });
  }
};

export const createProduct = (payload: INewProduct) => async (dispatch: AppDispatch) => {
  dispatch({ type: PRODUCTS.CREATE_PRODUCT_REQUEST });
  try {
    const { data } = await createProductAsync(payload);
    // __mock__
    // await new Promise(resolve => setTimeout(resolve, 2000));
    // const data = {
    //   id: 1,
    //   name: 'Product 1',
    //   price: 100,
    //   category: 'Category 1',
    //   description: 'Description 1',
    //   avatar: 'https://via.placeholder.com/500',
    //   developerEmail: ''
    // }
    dispatch({
      type: PRODUCTS.CREATE_PRODUCT,
      payload: data,
    });
    return true;
  } catch (error) {
    dispatch({
      type: PRODUCTS.CREATE_PRODUCT_ERROR,
      payload: errorHandler(error)
    });
    return false;
  }
};

export const deleteProductById = (id: string) => async (dispatch: AppDispatch) => {
  dispatch({ type: PRODUCTS.DELETE_PRODUCT_REQUEST });
  try {
    const { data } = await deleteProductAsync(id);
    console.log('deleted data', data);
    dispatch({ type: PRODUCTS.DELETE_PRODUCT_SUCCESS });
    return true;
  } catch (error) {
    dispatch({
      type: PRODUCTS.DELETE_PRODUCT_ERROR,
      payload: errorHandler(error)
    });
    return false;
  }
};
