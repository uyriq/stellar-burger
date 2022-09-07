import { configureStore, combineReducers } from '@reduxjs/toolkit'
// import { useDispatch, useSelector } from 'react-redux'
// import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { burgerConstructorSlice } from './slices/burger-constructor-slice'
import { orderDetailSlice } from './slices/order-details-slice'
import { ingredientDetailSlice } from './slices/ingredient-details-slice'

import { commonApi } from './services/common.api'

const preloadedState = {}

const rootReducer = combineReducers({
    [commonApi.reducerPath]: commonApi.reducer,
    burgerConstructor: burgerConstructorSlice.reducer,
    orderDetails: orderDetailSlice.reducer,
    ingredientDetail: ingredientDetailSlice.reducer,
})

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(commonApi.middleware),
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
})

// enable refetchOnMount and refetchOnReconnect behaviors
// setupListeners(store.dispatch)
/* export const useAppDispatch = () => useDispatch()
export const useAppSelector = () => useSelector() */
