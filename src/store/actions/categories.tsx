import type { AppDispatch, RootState } from 'store';
import { CATEGORY } from '../contants';
import { getAllCategoriesAsync, getSingleCategoryAsync } from '../services/categories';
import {
  categorizeProducts,
  errorHandler
} from './commons';

export const getAllCategories = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    dispatch({ type: CATEGORY.GET_CATEGORIES_REQUEST });
    const { products: { products } } = getState();

    const { data } = await getAllCategoriesAsync();
    const categorized = categorizeProducts(products, data.categories);

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

export const getSingleCategory = (id: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    dispatch({ type: CATEGORY.GET_SINGLE_CATEGORY_REQUEST });
    const { products: { products } } = getState();
    const { data: { category } } = await getSingleCategoryAsync(id);
    const categorized = categorizeProducts(products, [category]);

    dispatch({
      type: CATEGORY.GET_SINGLE_CATEGORY,
      payload: categorized
    });

  } catch (error) {
    dispatch({
      type: CATEGORY.GET_SINGLE_CATEGORY_ERROR,
      payload: errorHandler(error)
    });
  }
};
