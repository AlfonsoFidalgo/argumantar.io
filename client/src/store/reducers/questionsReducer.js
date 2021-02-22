import * as actionTypes from '../actions';

const initialState = {
    questions: null,
    activeQuestion: null
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.FETCH_QUESTIONS:
            return {
                ...state,
                questions: action.questions
            }
        case actionTypes.FETCH_QUESTION:
            return {
                ...state,
                activeQuestion: action.question
            }
        default:
            return state
    }
};

export default reducer;
