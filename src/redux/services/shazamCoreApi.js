import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://shazam-core.p.rapidapi.com/v1';

export const shazamApi = createApi({
   reducerPath: 'shazamCoreApi',
   baseQuery: fetchBaseQuery({
      baseUrl: baseUrl,
      prepareHeaders: (headers) => {
         headers.set('X-RapidAPI-Key', 'a6b0d6bb58msh3c92c1f9717c5b6p1914f9jsn971db3db9d3a');

         return headers;
      }
   }),
   endpoints: builder => ({
      getTopCharts: builder.query({ query: ()=> '/charts/world' }),
   })
});

export const {
   useGetTopChartsQuery,
} = shazamApi;