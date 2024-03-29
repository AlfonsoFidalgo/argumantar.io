import * as actionTypes from '../actions';

const initialState = {
    comments: null,
    loading: false,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.FETCH_COMMENTS:
            return {
                ...state,
                comments: action.comments,
                loading: false,
                error: null
            }
        case actionTypes.FETCH_COMMENTS_START:
            return {
                ...state,
                loading: true,
                error: null
            }
        case actionTypes.POST_COMMENT_START:
            return {
                ...state,
                loading: true,
                error: null
            }
        case actionTypes.POST_COMMENT_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.ADD_COMMENT:
            const newComment = action.comment;
            newComment[0].username = action.username;
            return {
                ...state,
                error: null,
                loading: false,
                comments: state.comments.concat(newComment)
            }
        default:
            return state
    }
};

export default reducer;
