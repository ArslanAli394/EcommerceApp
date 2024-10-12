import {createStore, applyMiddleware} from 'redux';
import {logger} from 'redux-logger';
import rootReducer from './root-reducer';
//redux persist use for to store our state after page loades and end the page
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';


const middleware = [thunk, logger]

const store = createStore(rootReducer,applyMiddleware(...middleware));

// redux persist store
const persistor = persistStore(store)
export  {
    store,
    persistor
};