import * as actionTypes from '../actions';

const initialState = {
    questions: null,
    activeQuestion: null,
    loading: false,
    error: null,
    postedQuestion: false
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.FETCH_QUESTIONS:
            return {
                ...state,
                questions: action.questions,
                error: null,
                activeQuestion: null
            }
        case actionTypes.FETCH_QUESTION:
            return {
                ...state,
                activeQuestion: action.question
            }
        case actionTypes.POST_QUESTION_START:
            return {
                ...state,
                error: null,
                loading: true
            };
        case actionTypes.POST_QUESTION_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.POST_QUESTION_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                postedQuestion: true
            }
        case actionTypes.UPDATE_QUESTIONS:
            return {
                ...state,
                error: null,
                loading: false,
                questions: action.questions
            }
        // case actionTypes.POST_QUESTION_SUCCESS:
        //     return {
        //         ...state,
        //         error: null,
        //         loading: false
        //     }
        default:
            return state
    }
};

export default reducer;
