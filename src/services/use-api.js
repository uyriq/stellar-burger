/* eslint-disable import/prefer-default-export */
import { ingredientsApi } from '../store/services/ingredients.api'
import { ordersApi } from '../store/services/orders.api'

export function apiIngredients() {
    const {
        data: ingredients = [],
        isLoading: ingredientsLoading,
        isError: ingredientsError,
    } = ingredientsApi.useFetchIngredientsQuery()

    const isLoading = ingredientsLoading
    const isError = ingredientsError
    return { ingredients, isLoading, isError }
}
export function apiOrders() {
    const {
        data: orderData = [],
        isLoading: createOrderLoading,
        isError: createOrderError,
    } = ordersApi.useCreateOrderMutation()

    const isLoading = createOrderLoading
    const isError = createOrderError
    return { orderData, isLoading, isError }
}
