import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { me } from 'actions/user';
import configureStore from './store';
import Root from './root';

const defaultState = {};
const store = configureStore(defaultState);
const root = document.getElementById('root');
const render = (Component) => { ReactDOM.render(<AppContainer><Provider store={store}><Component /></Provider></AppContainer>, root); };

// get me
store.dispatch(me());

render(Root);
if (module.hot) module.hot.accept('./root', () => render(require('./root').default));


// import createHistory from 'history/createBrowserHistory'
// import { ConnectedRouter } from 'react-router-redux'
// const history = createHistory()
// const store = configureStore(history)
// ReactDOM.render((
//     <Provider store={store}>
//         <ConnectedRouter history={history}>
//             <Root />
//         </ConnectedRouter>
//     </Provider>
// ), root);
