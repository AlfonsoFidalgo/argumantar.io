import * as actionTypes from '../actions';

const initialState = {
    arguments: null,
    loading: false,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.FETCH_ARGUMENTS:
            return {
                ...state,
                arguments: action.arguments,
                error: null
            }
        case actionTypes.POST_ARGUMENT_START:
            return {
                ...state,
                loading: true,
                error: null
            }
        case actionTypes.POST_ARGUMENT_FAIL:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
};

export default reducer;
