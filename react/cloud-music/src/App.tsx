import { GlobalStyle } from './style';
import { IconStyle } from './assets/iconfont/iconfont';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <>
      <GlobalStyle/>
      <IconStyle/>
      <Provider store={store}>
        <Router>
          <Routes/>
        </Router>
      </Provider>
    </>
  );
}

export default App;
