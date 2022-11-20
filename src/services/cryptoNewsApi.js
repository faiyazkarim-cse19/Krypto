import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
 
const cryptoNewsHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': 'dc431dd362msh9217d9e8272fce2p1feeb0jsn1490d5c88489',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
  }
 
  const baseUrl = 'https://bing-news-search1.p.rapidapi.com';
 
  const createRequest = (url) => ({url, headers: cryptoNewsHeaders});
 
  export const cryptoNewsApi = createApi({
      reducerPath: 'cryptoNewsApi',
      baseQuery: fetchBaseQuery({ baseUrl }),
      endpoints: (builder) => ({
          getCryptoNews: builder.query({
              query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
          })
      })
  });
 
  export const { useGetCryptoNewsQuery, } = cryptoNewsApi;