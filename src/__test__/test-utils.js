import React from 'react'
import { render } from '@testing-library/react'
import theme from 'utils/globals/theme';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import store from 'store';
import { getAllCategories } from 'store/actions/categories';
import { getAllProducts } from 'store/actions/products';
import { Provider } from 'react-redux';

(async () => {
  await store.dispatch(getAllCategories());
  await store.dispatch(getAllProducts()); 
}
)();

const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  )
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
