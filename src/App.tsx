import React from 'react';
import useSWR from 'swr';
import fetcher from './utils/fetcher';

function App() {
  const { data } = useSWR(
    'https://267a8b34-4ac1-432b-aa85-9249f3ce3b02.mock.pstmn.io/user/profile',
    fetcher
  );

  return (
    <div className="App">
      <span>{data.name}</span>
    </div>
  );
}

export default App;
