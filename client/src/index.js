import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import agreeReducer from './store/reducers/agreeReducer';


//middleware
const logger = (store) => {
    return (next) => {
        return (action) => {
            console.log('@from middleware@ dispatching:', action);
            const result = next(action);
            console.log('@from middleware@ next state:', store.getState());
            return result;
        }
    }
};

const rootReducer = combineReducers({
    agrees: agreeReducer
});

const store = createStore(rootReducer, applyMiddleware(logger));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

