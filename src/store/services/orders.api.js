/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { commonApi } from './common.api'

export const ordersApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
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
        fetchOrder: build.query({
            query: (orderId) => `orders/${orderId}`,
            method: 'GET',
        }),
    }),
})
