import * as actionTypes from './actions';

const initialState = {
    agreedQuestions: [],
    disagreedQuestions: []
};

const reducer = (state = initialState, action) => {
    const agreedQuestions = [...initialState.agreedQuestions];
    const disagreedQuestions = [...initialState.disagreedQuestions];
    switch (action.type){
        case actionTypes.AGREE:
            return {
                ...state,
                agreedQuestions: agreedQuestions.push(action.payload.questionId)
            }
        case actionTypes.REMOVE_AGREE:
            agreedQuestions.splice(agreedQuestions.indexOf(action.payload.questionId), 1);
            return {
                ...state,
                agreedQuestions: agreedQuestions
            }
        case actionTypes.DISAGREE:
            return {
                ...state,
                disagreedQuestions: disagreedQuestions.push(action.payload.questionId)
            }
        case actionTypes.REMOVE_DISAGREE:
            disagreedQuestions.splice(disagreedQuestions.indexOf(action.payload.questionId), 1)
            return {
                ...state,
                disagreedQuestions: disagreedQuestions
            }
        default:
            return state
    }
};

export default reducer;

