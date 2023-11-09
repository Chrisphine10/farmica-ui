//react redux store
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './shared/reducers/index';
import thunk from 'redux-thunk';


//const createStoreWithMiddleware = applyMiddleware()(createStore);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;