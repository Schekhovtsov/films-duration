import React from 'react';
import { BrowserRouter } from 'react-router-dom';

export const withRouter = (component: () => React.ReactNode) => function () {
  return (
    <BrowserRouter>
      {component()}
    </BrowserRouter>
  );
};
