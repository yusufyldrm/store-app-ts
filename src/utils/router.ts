import MainLayout from 'layouts/Main';
import { IRouter } from 'interfaces';
import {
  HomePage,
  ProductDetailPage,
  CreateProductPage,
  NotFoundPage
} from 'pages';

export const PATHS: IRouter[] = [
  {
    key: 'home',
    path: '/',
    component: HomePage,
    layout: MainLayout,
  },
  {
    key: 'productDetail',
    path: '/product/:productId',
    component: ProductDetailPage,
    layout: MainLayout,
  },
  {
    key: 'createProduct',
    path: '/create-product',
    component: CreateProductPage,
    layout: MainLayout,
  },
  {
    key: 'not-found',
    path: '*',
    component: NotFoundPage,
    layout: MainLayout,
  }
];
