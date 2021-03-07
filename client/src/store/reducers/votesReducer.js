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
                votes: action.votes,
                loading: false,
                error: null
            }
        case actionTypes.VOTE_START:
            return {
                ...state,
                error: false,
                loading: true
            }
        case actionTypes.ADD_VOTE_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                votes: state.votes.concat(action.vote)
            }
        case actionTypes.VOTE_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        default:
            return state
    }
};

export default reducer;