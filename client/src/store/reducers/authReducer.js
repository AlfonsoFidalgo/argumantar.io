import * as actionTypes from '../actions';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                username: action.username,
                error: null,
                loading: false
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                token: null,
                userId: null,
                username: null,
                error: action.error,
                loading: false
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
                username: null,
                error: null,
                loading: false
            }
        default:
            return state
    }
}

export default reducer