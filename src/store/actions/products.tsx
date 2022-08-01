import type { AppDispatch, RootState } from 'store';
import { INewProduct } from 'interfaces';
import { PRODUCTS } from '../contants';
import {
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
    const products = data.products;

    dispatch({
      type: PRODUCTS.GET_ALL_PRODUCTS,
      payload: products
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
    const { data: { product } } = await getSingleProductAsync(id);

    if (!product)
      throw new Error('Product not found.');

    dispatch({
      type: PRODUCTS.GET_SINGLE_PRODUCT,
      payload: product
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
    const { data: { product } } = await createProductAsync(payload);

    dispatch({
      type: PRODUCTS.CREATE_PRODUCT,
      payload: product,
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
    const { data: product } = await deleteProductAsync(id);
    console.log('deleted data', product);
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
