import React from 'react';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';

import { Router } from 'react-router-dom';

import './config/ReactotronConfig';

import Routes from './routes';
import history from './services/history';

import { store, persistor } from './store';

import GlobalStyle from './styles/global';

function App() {
  return (
    // history: agora o Router passa a ouvir todas as partes de navegação que a gente fizer dentro desse history
    //PersistGate vai renderizar o conteúdo das rotas, mas só depois de ter buscado as inf no storage
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
          <ToastContainer autoClose={3000}/>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;