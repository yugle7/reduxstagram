import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import { apiMiddleware } from 'redux-api-middleware';
import logger from './middlewares/logger';
import apiMiddlewareBefore from './middlewares/api';

// don't forget to remove logger-middleware from production!
export default initialState => applyMiddleware(apiMiddlewareBefore, apiMiddleware, logger)(createStore)(reducers, initialState);

// import storage from 'redux-persist/es/storage'
// import { apiMiddleware } from 'redux-api-middleware';
// import { applyMiddleware, createStore } from 'redux'
// import { createFilter   } from 'redux-persist-transform-filter';
// import { persistReducer, persistStore } from 'redux-persist'
// import { routerMiddleware } from 'react-router-redux'
//
// export default (history) => {
//     const persistedFilter = createFilter('auth', ['access', 'refresh']);
//     const reducer = persistReducer({
//             key: 'polls',
//             storage: storage,
//             whitelist: [ 'auth' ],
//             transforms: [ persistedFilter ]
//         }, reducers);
//     const store = createStore(reducer, {}, applyMiddleware(apiMiddleware, routerMiddleware(history)));
//     persistStore(store);
//     return store;
// }
