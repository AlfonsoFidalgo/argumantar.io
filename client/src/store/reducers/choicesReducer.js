import * as actionTypes from '../actions';

const initialState = {
    choices: null,
    loading: false,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.SET_CHOICES:
            return {
                ...state,
                choices: action.choices,
                loading: false,
                error: null
            }
        case actionTypes.CHOICE_START:
            return {
                ...state,
                error: null,
                loading: true
            }
        case actionTypes.CHOICE_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.ADD_CHOICE_SUCCESS:
            return {
                ...state,
                choices: state.choices.concat(action.choice),
                error: null,
                loading: false
            }
        case actionTypes.DELETE_CHOICE_SUCCESS:
            const newChoices = state.choices.filter(ch => ch.option_id !== action.choice.option_id);
            return {
                ...state,
                choices: newChoices,
                error: null,
                loading: false
            }
        default:
            return state
    }  
};

export default reducer;