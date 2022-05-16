import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import Header from '../components/Header';
import { store } from '../redux/store';
import '../styles/globals.css';
function MyApp({ Component, pageProps }) {
  return <>
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  </>
}

export default MyApp
