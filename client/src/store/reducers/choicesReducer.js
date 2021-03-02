import * as actionTypes from '../actions';

const initialState = {
    choices: null
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.SET_CHOICES:
            return {
                ...state,
                choices: action.choices
            }
        case actionTypes.ADD_CHOICE:
            return {
                ...state
            }
        default:
            return state
    }  
};

export default reducer;