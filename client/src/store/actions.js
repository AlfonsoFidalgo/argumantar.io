import axios from 'axios';

export const CHOICE_START = 'CHOICE_START';
export const ADD_CHOICE_SUCCESS = 'ADD_CHOICE_SUCCESS';
export const DELETE_CHOICE_SUCCESS = 'DELETE_CHOICE_SUCCESS';
export const CHOICE_FAIL = 'CHOICE_FAIL';
export const SET_CHOICES = 'SET_CHOICES';

export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const FETCH_QUESTION = 'FETCH_QUESTION';

export const POST_QUESTION_START = 'POST_QUESTION_START';
export const POST_QUESTION_FAIL = 'POST_QUESTION_FAIL';

export const FETCH_ARGUMENTS = 'FETCH_ARGUMENTS';

export const POST_ARGUMENT_START = 'POST_ARGUMENT_START';
export const POST_ARGUMENT_SUCCESS = 'POST_ARGUMENT_SUCCESS';
export const POST_ARGUMENT_FAIL = 'POST_ARGUMENT_FAIL';

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';

//FETCHING ARGUMENTS
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

//POSTING ARGUMENTS
export const postArgumentStart = () => {
    return {
        type: POST_ARGUMENT_START
    }
};

export const postArgumentFail = (error) => {
    return {
        type: POST_ARGUMENT_FAIL,
        error: error.message
    };
};

export const postArgument = (optionId, body, token, questionId) => {
    return dispatch => {
        dispatch(postArgumentStart());
        const data = {
            body: body
        };
        let headers = null;
        if (token){
            headers = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
        }
        axios.post(`http://localhost:3001/option/${optionId}/argument/post`, data, headers)
        .then(response => {
            console.log(response.data);
            dispatch(fetchArguments(questionId));
        })
        .catch(error => {
            console.log(error.response.data);
            dispatch(postArgumentFail(error.response.data));
        });
    }
}
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
            dispatch(setChoices(response.data.choices));
            dispatch(authSuccess(response.data.token, response.data.userId, response.data.username));
        })
        .catch(error => {
            dispatch(authFail(error.response.data));
        })
    };
};

//POSTING A QUESTION
export const postQuestionStart = () => {
    return {
        type: POST_QUESTION_START
    }
}

export const postQuestionFail = (error) => {
    return {
        type: POST_QUESTION_FAIL,
        error: error.message
    };
}

export const postQuestion = (title, body, token) => {
    return dispatch => {
        dispatch(postQuestionStart());
        const data = {
            title: title,
            body: body
        };
        let headers = null;
        if (token){
            headers = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
        }
        axios.post('http://localhost:3001/question/post', data, headers)
        .then(response => {
            console.log(response.data);
            // dispatch(postQuestionSuccess(response.data));
        })
        .catch(error => {
            console.log(error.response.data);
            dispatch(postQuestionFail(error.response.data));
        });
    }
}

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
export const setChoices = (choices) => {
    return {
        type: SET_CHOICES,
        choices: choices
    };
};


//CHOICES
export const choiceStart = () => {
    return {
        type: CHOICE_START
    }
}

export const choiceFail = (error) => {
    return {
        type: CHOICE_FAIL,
        error: error.message
    }
}

export const deleteChoiceSuccess = (choice) => {
    return {
        type: DELETE_CHOICE_SUCCESS,
        choice: choice.data[0]
    }
}

export const addChoiceSuccess = (choice) => {
    return {
        type: ADD_CHOICE_SUCCESS,
        choice: choice.data[0]
    }
}

export const changeChoice = (oldOptionId, newOptionId, token) => {
    return dispatch => {
        dispatch(choiceStart());
        let headers = null;
        if (token){
            headers = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
        }
        axios.delete(`http://localhost:3001/choice/${oldOptionId}`, headers)
        .then(response => {
            dispatch(deleteChoiceSuccess(response.data));
            axios.post(`http://localhost:3001/choice/${newOptionId}`, null, headers)
            .then(response => {
                dispatch(addChoiceSuccess(response.data));
            })
            .catch(error => {
                dispatch(choiceFail(error));
            })
        })
        .catch(error => {
            dispatch(choiceFail(error));
        })
    }
};

export const deleteChoice = (optionId, token) => {
    return dispatch => {
        dispatch(choiceStart());
        let headers = null;
        if (token){
            headers = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
        }
        axios.delete(`http://localhost:3001/choice/${optionId}`, headers)
        .then(response => {
            dispatch(deleteChoiceSuccess(response.data));
        })
        .catch(error => {
            dispatch(choiceFail(error));
        })
    }
};

export const postChoice = (optionId, token) => {
    return dispatch => {
        dispatch(choiceStart());
        let headers = null;
        if (token){
            headers = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
        }
        axios.post(`http://localhost:3001/choice/${optionId}`, null, headers)
        .then(response => {
            dispatch(addChoiceSuccess(response.data));
        })
        .catch(error => {
            dispatch(choiceFail(error));
        })
    }
};
