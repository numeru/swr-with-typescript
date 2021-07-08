import React from 'react';
import { useState } from 'react';
import useSWR from 'swr';
import fetcher from './utils/fetcher';

function App() {
  const {
    data: user,
    isValidating,
    revalidate,
    mutate,
  } = useSWR(
    'https://267a8b34-4ac1-432b-aa85-9249f3ce3b02.mock.pstmn.io/user/profile',
    fetcher,
    {
      onSuccess: () => console.log('success'),
      refreshInterval: 1000,
      dedupingInterval: 5000,
    }
  );

  const [name, setName] = useState('');

  const handleClickRevalidateButton = () => {
    if (isValidating) {
      console.log("can't revalidate!");
      return;
    }
    revalidate();
    console.log('revalidate!');
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const handleSubmitMutate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate({ ...user, name }, false);

    setName('');
  };

  return (
    <div>
      <div>{user ? user.name : 'Loading...'}</div>
      <button onClick={handleClickRevalidateButton}>revalidate1</button>
      <button onClick={handleClickRevalidateButton}>revalidate2</button>

      <form onSubmit={handleSubmitMutate}>
        <input value={name} onChange={handleChangeInput} />
        <button type="submit">mutate</button>
      </form>
    </div>
  );
}

export default App;
