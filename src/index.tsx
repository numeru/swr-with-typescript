import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { SWRConfig } from 'swr';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <SWRConfig
        value={{
          errorRetryCount: 3,
          onError: (err) => console.log(err),
        }}
      >
        <App />
      </SWRConfig>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);
