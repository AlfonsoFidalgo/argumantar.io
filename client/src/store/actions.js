import axios from 'axios';

export const AGREE = 'AGREE';
export const DISAGREE = 'DISAGREE';
export const REMOVE_AGREE = 'REMOVE_AGREE';
export const REMOVE_DISAGREE = 'REMOVE_DISAGREE';
export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';


//AUTH
export const authStart = () => {
    return {
        type: AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const data = {
            email: email,
            password: password
        };
        axios.post('http://localhost:3001/user/login', data)
        .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data));
        })
        .catch(error => {
            console.log(error);
            dispatch(authFail(error.response.data));
        })
    };
};


//FETCHING QUESTIONS
export const setQuestions = (questions) => {
    return {
        type: FETCH_QUESTIONS,
        posts: questions
    };
};

export const fetchQuestions = () => {
    return dispatch => {
        axios.get('http://localhost:3001/questions')
        .then((response => {
            //this.setState({questions: response.data, loading: false});
            dispatch(setQuestions(response.data))
        }));
    };
};

// AGREES AND DISAGREES
export const agree = (questionId) => {
    return {
        type: AGREE,
        questionId: questionId
    }
}

export const disagree = (questionId) => {
    return {
        type: DISAGREE,
        questionId: questionId
    }
}

export const removeAgree = (questionId) => {
    return {
        type: REMOVE_AGREE,
        questionId: questionId
    }
}

export const removeDisagree = (questionId) => {
    return {
        type: REMOVE_AGREE,
        questionId: questionId
    }
}