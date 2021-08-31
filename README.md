# SWR

## 1. useSWR

```ts
const { data: user, isValidating } = useSWR('/user', fetcher, {
  onSuccess: () => console.log('success'),
  refreshInterval: 1000,
  dedupingInterval: 5000,
});
```

<br />

## 2. useSWRImmutable

```ts
const { data: user, isValidating } = useSWRImmutable('/user', fetcher, {
  onSuccess: () => console.log('immutable success'),
  suspense: true,
  onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    // 404에서 재시도 안함
    if (error.status === 404) return;

    // 특정 키에 대해 재시도 안함
    if (key === '/api/user') return;

    // 10번 까지만 재시도함
    if (retryCount >= 10) return;

    // 5초 후에 재시도
    setTimeout(() => revalidate({ retryCount }), 5000);
  },
});
```

<br />

## 3. useSWRInfinite

```tsx
const { data, size, setSize } = useSWRInfinite(
  `/users?page=${pageIndex}&limit=10`,
  fetcher
);

<button onClick={() => setSize(size + 1)}>Load More</button>;
```

<br />

## 4. useSWRConfig

- 모든 전역 구성을 반환한다.

```ts
const { refreshInterval, cache, mutate, ...restConfig } = useSWRConfig();
```

<br />

## 5. SWRConfig

- 모든 SWR 훅에 대한 대한 글로벌 설정을 제공한다.

```tsx
<SWRConfig
  value={{
    errorRetryCount: 3,
    onError: (err) => console.log(err),
  }}
>
  <App />
</SWRConfig>
```

<br />

## 6. Mutate

- 갱신하기.
- useSWRConfig 에서 사용할 것을 권장.

```ts
const { mutate } = useSWRConfig();

mutate('/user');

mutate('/user', { ...user, name }, false);
```
