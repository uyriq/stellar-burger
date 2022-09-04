import { configureStore, combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({})

const preloadedState = {
    data: [],
}
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
})

export default store
