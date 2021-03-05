import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import questionsReducer from './store/reducers/questionsReducer';
import authReducer from './store/reducers/authReducer';
import argumentsReducer from './store/reducers/argumentsReducer';
import choicesReducer from './store/reducers/choicesReducer';
import votesReducer from './store/reducers/votesReducer';


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
    questions: questionsReducer,
    auth: authReducer,
    arguments: argumentsReducer,
    choices: choicesReducer,
    votes: votesReducer
});

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

