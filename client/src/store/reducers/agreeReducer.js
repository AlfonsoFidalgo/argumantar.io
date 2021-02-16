import * as actionTypes from '../actions';

const initialState = {
    agreedQuestions: [],
    disagreedQuestions: [],
    questions: []
};

const reducer = (state = initialState, action) => {
    const agreedQuestions = [...state.agreedQuestions];
    const disagreedQuestions = [...state.disagreedQuestions];
    switch (action.type){
        case actionTypes.AGREE:
            agreedQuestions.push(action.questionId);
            return {
                ...state,
                agreedQuestions: agreedQuestions
            }
        case actionTypes.REMOVE_AGREE:
            agreedQuestions.splice(agreedQuestions.indexOf(action.questionId), 1);
            return {
                ...state,
                agreedQuestions: agreedQuestions
            }
        case actionTypes.DISAGREE:
            disagreedQuestions.push(action.questionId);
            return {
                ...state,
                disagreedQuestions: disagreedQuestions
            }
        case actionTypes.REMOVE_DISAGREE:
            disagreedQuestions.splice(disagreedQuestions.indexOf(action.questionId), 1)
            return {
                ...state,
                disagreedQuestions: disagreedQuestions
            }
        default:
            return state
    }
};

export default reducer;

