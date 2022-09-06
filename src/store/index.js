import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { commonApi } from './services/common.api'

const preloadedState = {}

const rootReducer = combineReducers({
    [commonApi.reducerPath]: commonApi.reducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(commonApi.middleware),
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
})

export const useAppDispatch = () => useDispatch()
export const useAppSelector = () => useSelector()
