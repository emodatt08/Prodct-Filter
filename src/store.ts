
import { combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { ProductReducer } from './Reducers/ProductReducer';

const initialState = {
    products: {products: []}

} as {};
const reducers = combineReducers({
  products: ProductReducer
});

export const store = configureStore({
    reducer: reducers,
    preloadedState: initialState,
    middleware: [thunkMiddleware],
});


export default store;

export type RootState = ReturnType<typeof store.getState>; 