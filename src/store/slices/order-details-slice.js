/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = { ids: [1, 2], show: false }

export const orderDetailSlice = createSlice({
    name: 'orderDetail',
    initialState,
    reducers: {
        setOrder: (state, action) => {
            const order = {
                ...action.payload,
            }
            state.ids = order
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
        // eslint-disable-next-line no-return-assign, no-unused-vars
        resetShowOrder: (state) => (state = initialState),
    },
})

export const { setOrder, resetOrder, setShowOrder, resetShowOrder } = orderDetailSlice.actions
export const selectShowOrder = (state) => state.orderDetail.show
export const selectDetailsOrder = (state) => state.orderDetail?.ids

export default orderDetailSlice.reducer
