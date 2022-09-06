/* eslint-disable import/prefer-default-export */
import { ingredientsApi } from '../store/services/ingredients.api'

export function apiIngredients() {
    const {
        data: ingredients = [],
        isLoading: ingredientsLoading,
        isError: ingredientsError,
    } = ingredientsApi.useFetchIngredientsQuery()
    const {
        data: orderData = [],
        isLoading: createOrderLoading,
        isError: createOrderError,
    } = ingredientsApi.useCreateOrderMutation()

    const isLoading = ingredientsLoading || createOrderLoading
    const isError = createOrderError || ingredientsError
    return { ingredients, orderData, isLoading, isError }
}
