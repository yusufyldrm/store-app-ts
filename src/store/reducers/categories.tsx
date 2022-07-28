import { PayloadAction } from '@reduxjs/toolkit';
import { CATEGORY } from '../contants';
import { ICategoryState, ICustomError } from 'interfaces';

const initCutomError: ICustomError = {
  status: false,
  message: ''
};

const initState: ICategoryState = {
  categories: [],
  isLoading: false,
  error: initCutomError
};

const categoriesReducer = (state = initState, action: PayloadAction) => {
  switch (action.type) {
    // **Get all categories
    case CATEGORY.GET_CATEGORIES_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: initState.error
      };

    case CATEGORY.GET_CATEGORIES_ERROR:
      return {
        ...state,
        error: { status: true, message: action.payload }
      };

    case CATEGORY.GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        isLoading: false,
        error: initState.error
      };

    default:
      return state;
  }
};

export default categoriesReducer;
