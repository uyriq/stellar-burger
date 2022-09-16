/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    success: false,
    data: [],
}
export const fetchedDataSlice = createSlice({
    name: 'fetchedData',
    initialState,
    reducers: {
        setData: (state, payload) => {
            const order = {
                ...payload.payload,
            }
            console.log(order)
            state = { ...payload }
        },
        resetData: (state) => {
            // eslint-disable-next-line no-return-assign, no-unused-vars
            state = initialState
        },
        // eslint-disable-next-line no-return-assign, no-unused-vars
    },
})

export const { resetData, setData } = fetchedDataSlice.actions
export const selectDataSucces = (state) => state.fetchedData.success
export const selectDataFetched = (state) => state.fetchedData?.data

export default fetchedDataSlice.reducer
