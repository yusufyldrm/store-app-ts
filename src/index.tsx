import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from 'styled-components';
import theme from 'utils/globals/theme';
import GlobalStyle from 'utils/globals/GlobalStyle';
import store from 'store';
import { getAllCategories, /* __mockCategoriesToRedux */ } from 'store/actions/categories';

if (process.env.NODE_ENV === 'production') {
  console.log = () => { }
  console.error = () => { }
  console.debug = () => { }
  console.info = () => { }
  console.warn = () => { }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(getAllCategories());
// store.dispatch(__mockCategoriesToRedux());

root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
