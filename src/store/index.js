import { configureStore, combineReducers } from '@reduxjs/toolkit'
// import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { fetchedDataSlice } from './slices/fetched-data-slice'
import { burgerConstructorSlice } from './slices/burger-constructor-slice'
import { orderDetailsSlice } from './slices/order-details-slice'
import { ingredientDetailSlice } from './slices/ingredient-details-slice'
import { commonApi } from './services/common.api'

// const preloadedState = {}

const rootReducer = combineReducers({
    [commonApi.reducerPath]: commonApi.reducer,
    fetchedData: fetchedDataSlice.reducer,
    burgerConstructor: burgerConstructorSlice.reducer,
    ingredientDetail: ingredientDetailSlice.reducer,
    orderDetails: orderDetailsSlice.reducer,
})

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(commonApi.middleware),
    // preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
})

// enable refetchOnMount and refetchOnReconnect behaviors
// setupListeners(store.dispatch)
