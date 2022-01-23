import { Routing } from 'pages';
import React from 'react';
import { withProviders } from './providers';

function App() {
  return (
    <div className="App">
        {/*// Здесь можно и хедер*/}
        <Routing />
    </div>
  );
}

export default withProviders(App);
