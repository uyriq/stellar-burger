/* eslint-disable import/prefer-default-export */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { BURGER_API_URL } from '../../utils/constants'

export const commonApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BURGER_API_URL,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json;charset=UTF-8')
            // headers.set('Authorization', 'anonymous')
            return headers
        },
    }),
    tagTypes: ['Ingredients'],
    // eslint-disable-next-line no-unused-vars
    endpoints: (_) => ({}),
})
