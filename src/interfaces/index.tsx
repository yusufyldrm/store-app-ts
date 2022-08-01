// Common types
export type { RootState, AppDispatch } from 'store';

export interface IProduct {
  _id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  avatar: string;
  developerEmail: string;
  createdAt: Date;
};

export interface ICustomError {
  status: boolean;
  message: string;
};

export interface ICategory {
  _id: number;
  name: string;
  createdAt: Date | string | object | null;
  products?: IProduct[];
};

export interface IRouter {
  key: string;
  path: string;
  component: React.ComponentType<any>;
  layout: React.ComponentType<any>;
};

export interface ICategoryState {
  categories: ICategory[];
  isLoading: boolean;
  error: ICustomError;
  singleCategory: {
    category: ICategory | null;
    isLoading: boolean;
    error: ICustomError;
  }
};

export interface IProcutsState {
  products: IProduct[];
  newProduct: {
    data: IProduct | null;
    isLoading: boolean;
    error: ICustomError;
  };
  singleProduct: {
    data: IProduct | null;
    isLoading: boolean;
    error: ICustomError;
  },
  deleteProduct: {
    isLoading: boolean;
    error: ICustomError;
  },
  isLoading: boolean;
  error: ICustomError;
}

export interface IReducer {
  categories: ICategoryState;
  products: IProcutsState;
};

export interface INewProduct {
  name: string;
  description: string;
  avatar: string;
  category: string;
  price: number;
  developerEmail: string;
};
