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
        // TODO проверить createOrder
        createOrder: build.mutation({
            query: (orderDetails) => ({
                url: '/orders',
                method: 'POST',
                body: orderDetails,
            }),
            async onQueryStarted({ orderDetails }, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                } catch (e) {
                    // eslint-disable-next-line no-console
                    console.error('ingredientsApi postOrder error', e)
                }
            },
        }),
        makeOrder: build.mutation({
            query: (body) => ({
                url: '/orders',
                method: 'POST',
                body: {
                    ingredients: body,
                },
            }),
        }),
    }),
})
