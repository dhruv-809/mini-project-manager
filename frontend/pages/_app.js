
import '../styles/globals.css';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { store } from '../store/store';
import { initializeAuth } from '../store/authSlice';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    store.dispatch(initializeAuth());
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;