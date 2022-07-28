import { combineReducers } from 'redux';
import products from './products';
import categories from './categories';

const reducer = combineReducers({
  products: products,
  categories: categories
});

export default reducer;
