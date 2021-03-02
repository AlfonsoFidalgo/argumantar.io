import * as actionTypes from '../actions';

const initialState = {
    choices: null
};

const reducer = (state = initialState, action) => {
    //const allChoices = [...state.choices];
    switch (action.type){
        case actionTypes.SET_CHOICES:
            return {
                ...state,
                choices: action.choices
            }
        case actionTypes.ADD_CHOICE:
            //allChoices.push(action.choice);
            return {
                ...state,
                choices: state.choices.concat(action.choice)
            }
        default:
            return state
    }  
};

export default reducer;