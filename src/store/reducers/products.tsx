import { PayloadAction } from '@reduxjs/toolkit';
import { PRODUCTS } from '../contants';
import { ICustomError, IProcutsState } from 'interfaces';

const initCutomError: ICustomError = {
  status: false,
  message: ''
};

const initState: IProcutsState = {
  products: [],
  newProduct: {
    data: null,
    isLoading: false,
    error: initCutomError,
  },
  singleProduct: {
    data: null,
    isLoading: false,
    error: initCutomError,
  },
  deleteProduct: {
    isLoading: false,
    error: initCutomError,
  },
  isLoading: false,
  error: initCutomError
};

const productReducer = (state = initState, action: PayloadAction) => {
  switch (action.type) {
    // **Get all products
    case PRODUCTS.GET_ALL_PRODUCTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: initState.error
      };

    case PRODUCTS.GET_ALL_PRODUCTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: {
          status: true,
          message: action.payload
        }
      };

    case PRODUCTS.GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        isLoading: false,
        error: initState.error
      };

    // **Create Product
    case PRODUCTS.CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        newProduct: {
          ...state.newProduct,
          isLoading: true,
          error: { ...initCutomError }
        }
      };

    case PRODUCTS.CREATE_PRODUCT_ERROR:
      return {
        ...state,
        newProduct: {
          ...state.newProduct,
          isLoading: false,
          error: {
            status: true,
            message: action.payload
          }
        }
      };

    case PRODUCTS.CREATE_PRODUCT:
      return {
        ...state,
        newProduct: {
          ...state.newProduct,
          data: action.payload,
          isLoading: false,
          error: { ...initCutomError }
        }
      };

    // **Get Single Product
    case PRODUCTS.GET_SINGLE_PRODUCT_REQUEST:
      return {
        ...state,
        singleProduct: {
          ...state.singleProduct,
          isLoading: true,
          error: initCutomError
        }
      };

    case PRODUCTS.GET_SINGLE_PRODUCT_ERROR:
      return {
        ...state,
        singleProduct: {
          data: null,
          isLoading: false,
          error: {
            status: true,
            message: action.payload
          }
        }
      };

    case PRODUCTS.GET_SINGLE_PRODUCT:
      return {
        ...state,
        singleProduct: {
          data: action.payload,
          isLoading: false,
          error: initCutomError
        }
      };

    // **Delete Product
    case PRODUCTS.DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        deleteProduct: {
          isLoading: true,
          error: initCutomError
        }
      };

    case PRODUCTS.DELETE_PRODUCT_ERROR:
      return {
        ...state,
        deleteProduct: {
          error: {
            status: true,
            message: action.payload
          },
          isLoading: false
        }
      };

    case PRODUCTS.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        deleteProduct: {
          isLoading: false,
          error: initCutomError
        }
      };

    default:
      return state;
  };
};

export default productReducer;
