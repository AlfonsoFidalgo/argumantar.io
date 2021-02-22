import axios from 'axios';

export const AGREE = 'AGREE';
export const DISAGREE = 'DISAGREE';
export const REMOVE_AGREE = 'REMOVE_AGREE';
export const REMOVE_DISAGREE = 'REMOVE_DISAGREE';

export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const FETCH_QUESTION = 'FETCH_QUESTION';

export const FETCH_ARGUMENTS = 'FETCH_ARGUMENTS';

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';

//ARGUMENTS
export const setArguments = (args) => {
    return {
        type: FETCH_ARGUMENTS,
        arguments: args
    };
};

export const fetchArguments = (questionId) => {
    return dispatch => {
        axios.get(`http://localhost:3001/question/${questionId}/arguments/get`)
        .then((response => {
            dispatch(setArguments(response.data.data))
        }));
    };
};

//AUTH
export const authStart = () => {
    return {
        type: AUTH_START
    };
};

export const authSuccess = (token, userId, username) => {
    return {
        type: AUTH_SUCCESS,
        token: token,
        userId: userId,
        username: username
    };
};

export const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        error: error.message
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
            console.log(response.data);
            dispatch(authSuccess(response.data.token, response.data.userId, response.data.username));
        })
        .catch(error => {
            console.log(error);
            dispatch(authFail(error.response.data));
        })
    };
};


//FETCHING A QUESTION
export const setQuestion = (question) => {
    return {
        type: FETCH_QUESTION,
        question: question
    };
};

export const fetchQuestion = (id) => {
    return dispatch => {
        axios.get(`http://localhost:3001/question/${id}`)
        .then((response => {
            dispatch(setQuestion(response.data))
        }));
    };
};

//FETCHING QUESTIONS
export const setQuestions = (questions) => {
    return {
        type: FETCH_QUESTIONS,
        questions: questions
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