/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    show: false,
    details: {
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

export const ingredientDetailSlice = createSlice({
    name: 'ingredientDetail',
    initialState,
    reducers: {
        setDetailsCard: (state, action) => {
            const { details } = {
                ...action.payload,
            }
            state.details = details
        },
        resetDetailsCard: (state) => {
            // eslint-disable-next-line no-return-assign, no-unused-vars
            state = initialState
        },
        setShowCard: (state, payload) => {
            state.show = payload // true
        },
        // eslint-disable-next-line no-return-assign, no-unused-vars
        resetShowCard: (state) => (state = initialState),
    },
})
export const { setDetailsCard, resetDetailsCard, setShowCard, resetShowCard } = ingredientDetailSlice.actions
export const selectShowCard = (state) => state.ingredientDetail.show
export const selectDetailsCard = (state) => state.ingredientDetail.details

export default ingredientDetailSlice.reducer
