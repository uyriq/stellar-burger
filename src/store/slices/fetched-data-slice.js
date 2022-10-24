/* eslint-disable no-param-reassign */
// этот слайс не использую, использую только src\store\services\ingredients.api.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    success: false,
    data: [],
    activeIngredient: {
        _id: '',
        name: '',
        type: '',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: '',
        image_mobile: '',
        image_large: '',
        __v: 0,
        uuid: '',
    },
}
export const fetchedDataSlice = createSlice({
    name: 'fetchedData',
    initialState,
    reducers: {
        setData: (state, action) => {
            const data = action.payload
            state.data = data
        },
        resetData: (state) => {
            // eslint-disable-next-line no-return-assign, no-unused-vars
            state = initialState
        },
        setActiveIngredientByUuid: (state, action) => {
            // eslint-disable-next-line no-underscore-dangle
            const activeIngredient = state.data.filter((el) => el._id === action.payload.uuid)
            state.activeIngredient = activeIngredient
        },
    },
})

export const { resetData, setData, setActiveIngredientByUuid } = fetchedDataSlice.actions
export const selectDataSucces = (state) => state.fetchedData.success
export const selectDataFetched = (state) => state.fetchedData?.data
/*
export const selectActiveIngredient = (state) => state.fetchedData?.activeIngredient // это нерабочий способ определения активного ингредиента
 */
export default fetchedDataSlice.reducer
