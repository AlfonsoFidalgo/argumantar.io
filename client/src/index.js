import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './store/reducer';


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

const store = createStore(reducer, applyMiddleware(logger));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

