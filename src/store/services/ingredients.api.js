/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { commonApi } from './common.api'

export const ingredientsApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
        // фетч работает, ок
        fetchIngredients: build.query({
            query: () => ({
                url: '/ingredients',
                params: {},
            }),
            // eslint-disable-next-line no-unused-vars
            // transformResponse: (response) => response.data
            providesTags: (result) => [{ type: 'Ingredients', id: 'Data' }],
        }),
    }),
})
