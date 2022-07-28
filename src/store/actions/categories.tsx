import type { AppDispatch, RootState } from 'store';
import { CATEGORY, PRODUCTS } from '../contants';
import { getAllCategoriesAsync } from '../services/categories';
import {
  categorizeProducts,
  errorHandler
} from './commons';

export const getAllCategories = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    dispatch({ type: CATEGORY.GET_CATEGORIES_REQUEST });
    const { products: { products } } = getState();

    const { data } = await getAllCategoriesAsync();

    const categorized = categorizeProducts(products, data);

    dispatch({
      type: CATEGORY.GET_CATEGORIES,
      payload: categorized
    });

  } catch (error) {
    dispatch({
      type: CATEGORY.GET_CATEGORIES_ERROR,
      payload: errorHandler(error)
    });
  }
};

export const __mockCategoriesToRedux = () => async (dispatch: AppDispatch) => {
  const products = [
    {
      id: 1,
      name: 'Product 1',
      price: 100,
      category: 'Category 1',
      description: 'Description 1',
      avatar: 'https://via.placeholder.com/150',
      developerEmail: ''
    }
  ];

  const categories = [
    {
      id: 1,
      name: 'Category 1',
      products: products
    }
  ];

  dispatch({
    type: CATEGORY.GET_CATEGORIES,
    payload: categories
  });

  dispatch({
    type: PRODUCTS.GET_ALL_PRODUCTS,
    payload: products
  });
};
