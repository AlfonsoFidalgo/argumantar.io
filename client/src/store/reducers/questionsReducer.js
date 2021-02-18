import * as actionTypes from '../actions';

const initialState = {
    questions: null,
    loading: true
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.FETCH_QUESTIONS:
            return {
                ...state,
                questions: action.posts
            }
        default:
            return state
    }
};

export default reducer;
