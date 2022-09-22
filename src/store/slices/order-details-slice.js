/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = { ids: [1, 2], show: false }

export const orderDetailsSlice = createSlice({
    name: 'orderDetails',
    initialState,
    reducers: {
        setOrder: (state, payload) => {
            const order = {
                ...payload.payload,
            }
            console.log(order)
            state.ids = { ...payload }
        },
        resetOrder: (state) => {
            // eslint-disable-next-line no-return-assign, no-unused-vars
            state = initialState
        },
        setShowOrder: (state) => {
            const curState = {
                ...state,
            }
            state.show = !curState.show
        },
        setShow2Order: (state, payload) => {
            state.show = payload.payload // true
        },

        // eslint-disable-next-line no-return-assign, no-unused-vars
        resetShowOrder: (state) => (state = initialState),
    },
})

export const { setOrder, resetOrder, setShowOrder, resetShowOrder } = orderDetailsSlice.actions
export const selectShowOrder = (state) => state.orderDetails?.show
export const selectDetailsOrder = (state) => state.orderDetails?.ids

export default orderDetailsSlice.reducer
