/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { v1 as uuid } from 'uuid'

const initialState = {
    bun: {
        _id: '',
        name: '',
        type: 'bun',
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
    notbun: [],
}

export const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState,
    reducers: {
        addBun: (state, action) => {
            const bun = {
                ...action.payload,
                uuid: uuid(),
            }
            state.bun = bun
        },
        addNotBun: (state, action) => {
            const notbun = {
                ...action.payload,
                uuid: uuid(),
            }
            state.notbun = [...state.notbun, notbun]
        },
        delItem: (state, action) => {
            const { type, uuid } = action.payload
            if (type === 'bun') {
                state.bun = initialState.bun
            }
            if (type !== 'bun' && type !== undefined && type !== null) {
                state.notbun = state.notbun.filter((el) => el.uuid !== uuid)
            }
        },
        resetItems: (state) => {
            state.notbun = initialState.notbun
            state.bun = initialState.bun
        },
    },
})

export const { addBun, addNotBun, delItem, resetItems } = burgerConstructorSlice.actions

export default burgerConstructorSlice.reducer

export const selectBunsCart = (state) => state.burgerConstructor.bun
export const selectNotBunsCart = (state) => state.burgerConstructor.notbun
