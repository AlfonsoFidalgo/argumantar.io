import * as actionTypes from '../actions';

const initialState = {
    arguments: null
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.FETCH_ARGUMENTS:
            return {
                ...state,
                arguments: action.arguments
            }
        default:
            return state
    }
};

export default reducer;
