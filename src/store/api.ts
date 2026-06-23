import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getApiUrl } from '../helpers';
import { Credentials } from '../interface';

import type { RootState } from './store';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: getApiUrl(),
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    loginWithGoogle: builder.mutation<Credentials, { idToken: string }>({
      query: (body) => ({ url: '/auth/google', method: 'POST', body }),
    }),
    forgotPassword: builder.mutation<void, { email: string }>({
      query: (body) => ({ url: '/auth/forgot-password', method: 'POST', body }),
    }),
    register: builder.mutation<Credentials, { name: string; email: string; password: string }>({
      query: (body) => ({ url: '/auth/register', method: 'POST', body }),
    }),
  }),
});

export const {
  useLoginWithGoogleMutation,
  useForgotPasswordMutation,
  useRegisterMutation,
} = api;
