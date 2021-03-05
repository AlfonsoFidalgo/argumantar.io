import * as actionTypes from '../actions';

const initialState = {
    votes: null,
    loading: false,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.SET_VOTES:
            return {
                ...state,
                votes: action.votes
            }
        default:
            return state
    }
};

export default reducer;