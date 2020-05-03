import {createStore, applyMiddleware} from 'redux';
import {persistStore} from 'redux-persist';
import rootReducer from './root-reducer';

const middlewares = [];

if(process.env.NODE_ENV === 'development'){
 
}

export const store = createStore(rootReducer,applyMiddleware(...middlewares));
export const persistor = persistStore(store);

export default {store,persistor};