import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app';

import 'app/index.css';
import 'antd/dist/antd.css';
import { filmsStore } from 'entities/films/films.store';
import { StoreContext } from 'app/hooks/use-store';

ReactDOM.render(
  <StoreContext.Provider value={filmsStore}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StoreContext.Provider>,
  document.getElementById('root'),
);
