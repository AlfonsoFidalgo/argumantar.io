import axios from 'axios';

export const CHOICE_START = 'CHOICE_START';
export const ADD_CHOICE_SUCCESS = 'ADD_CHOICE_SUCCESS';
export const DELETE_CHOICE_SUCCESS = 'DELETE_CHOICE_SUCCESS';
export const CHOICE_FAIL = 'CHOICE_FAIL';
export const SET_CHOICES = 'SET_CHOICES';

export const  VOTE_START = 'VOTE_START';
export const ADD_VOTE_SUCCESS = 'ADD_VOTE_SUCCESS';
export const DELETE_VOTE_SUCCESS = 'DELETE_VOTE_SUCCESS';
export const  VOTE_FAIL = 'VOTE_FAIL';
export const SET_VOTES = 'SET_VOTES';

export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const FETCH_QUESTION = 'FETCH_QUESTION';
export const UPDATE_QUESTIONS = 'UPDATE_QUESTIONS';

export const POST_QUESTION_START = 'POST_QUESTION_START';
export const POST_QUESTION_FAIL = 'POST_QUESTION_FAIL';
export const POST_QUESTION_SUCCESS = 'POST_QUESTION_SUCCESS';

export const FETCH_ARGUMENTS = 'FETCH_ARGUMENTS';

export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const FETCH_COMMENTS_START = 'FETCH_COMMENTS_START';
export const POST_COMMENT_START = 'POST_COMMENT_START';
export const POST_COMMENT_FAIL = 'POST_COMMENT_FAIL';
export const ADD_COMMENT = 'ADD_COMMENT';

export const POST_ARGUMENT_START = 'POST_ARGUMENT_START';
export const POST_ARGUMENT_SUCCESS = 'POST_ARGUMENT_SUCCESS';
export const POST_ARGUMENT_FAIL = 'POST_ARGUMENT_FAIL';

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

//FETCHING ARGUMENTS
export const setArguments = (args) => {
    return {
        type: FETCH_ARGUMENTS,
        arguments: args
    };
};

export const fetchArguments = (questionId) => {
    return dispatch => {
        axios.get(`/api/question/${questionId}/arguments/get`)
        .then((response => {
            dispatch(setArguments(response.data.data))
        }));
    };
};

//COMMENTS
export const setComments = (comments) => {
    return {
        type: FETCH_COMMENTS,
        comments: comments
    };
};

export const addComment = (comment, username) => {
    return {
        type: ADD_COMMENT,
        comment: comment,
        username: username
    }
}

export const fetchCommentsStart = () => {
    return {
        type: FETCH_COMMENTS_START
    };
};

export const postCommentStart = () => {
    return {
        type: POST_COMMENT_START
    };
};

export const postCommentFail = () => {
    return {
        type: POST_COMMENT_FAIL
    };
};

export const fetchComments = (questionId) => {
    return dispatch => {
        dispatch(fetchCommentsStart());
        axios.get(`/api/comments/question/${questionId}`)
        .then((response => {
            dispatch(setComments(response.data.data))
        }));
    };
};

export const postComment = (body, token, argumentId, questionId, username) => {
    return  dispatch => {
        dispatch(postCommentStart());
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
        };
        axios.post(`/api/comment/post/${argumentId}`, data, headers)
        .then(response => {
            dispatch(addComment(response.data.data, username));
            dispatch(fetchArguments(questionId));
        })
        .catch(error => {
            dispatch(postCommentFail(error.response));
        });
    }
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
        axios.post(`/api/option/${optionId}/argument/post`, data, headers)
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

export const logout = () => {
    return {
        type: AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
            dispatch(setChoices([]));
        }, expirationTime)
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

export const signup = (email, username, displayName, password) => {
    return dispatch => {
        dispatch(authStart());
        const data = {
            email,
            username,
            displayName,
            password
        };
        axios.post('/api/user/signup', data)
        .then(response => {
            dispatch(auth(email, password));
        })
        .catch(error => {
            dispatch(authFail(error.response.data))
        });
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const data = {
            email: email,
            password: password
        };
        axios.post('/api/user/login', data)
        .then(response => {
            dispatch(setChoices(response.data.choices));
            dispatch(authSuccess(response.data.token, response.data.userId, response.data.username));
            dispatch(checkAuthTimeout(3600000));
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

export const postQuestionSuccess = () => {
    return {
        type: POST_QUESTION_SUCCESS,
        postedQuestion: true
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
        axios.post('/api/question/post', data, headers)
        .then(response => {
            console.log(response.data);
            dispatch(postQuestionSuccess());
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

export const updateQuestions = (questions, questionId, updatedValues) => {
    const qs = questions.map((q) => {
        if (questionId !== q.question_id){
            return q
        }

        return {
            ...q,
            ...updatedValues
        }
    })

    return {
        type: UPDATE_QUESTIONS,
        questions: qs
    };
};

export const fetchQuestion = (id, token = null) => {
    return dispatch => {
        let headers = null;
        if (token){
            headers = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
        }
        axios.get(`/api/question/${id}`, headers)
        .then((response => {
            console.log(response.data);
            dispatch(setVotes(response.data.votes));
            dispatch(setQuestion(response.data.question));
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
        axios.get('/api/questions')
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
        axios.delete(`/api/choice/${oldOptionId}`, headers)
        .then(response => {
            dispatch(deleteChoiceSuccess(response.data));
            axios.post(`/api/choice/${newOptionId}`, null, headers)
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
        axios.delete(`/api/choice/${optionId}`, headers)
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
        axios.post(`/api/choice/${optionId}`, null, headers)
        .then(response => {
            dispatch(addChoiceSuccess(response.data));
        })
        .catch(error => {
            dispatch(choiceFail(error));
        })
    }
};


//ARGUMENT VOTES
export const voteStart = () => {
    return {
        type: VOTE_START
    }
}

export const addVoteSuccess = () => {
    return {
        type: ADD_VOTE_SUCCESS
        //vote: vote
    }
}

export const deleteVoteSuccess = () => {
    return {
        type: DELETE_VOTE_SUCCESS
        //vote: vote
    }
}

export const voteFail = (error) => {
    return {
        type: VOTE_FAIL,
        error: error.message
    }
}

export const setVotes = (votes) => {
    return {
        type: SET_VOTES,
        votes: votes
    };
};

export const postVote = (argumentId, token, voteType) => {
    return dispatch => {
        dispatch(voteStart());
        let headers = null;
        if (token){
            headers = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
        }
        const body = {
            type: `${voteType}`
        };
        axios.post(`/api/vote/argument/${argumentId}`, body, headers)
        .then(response => {
            dispatch(addVoteSuccess(response.data));
        })
        .catch(error => {
            dispatch(voteFail(error));
        })
    }
};

export const deleteVote = (argumentId, token) => {
    return dispatch => {
        dispatch(voteStart());
        let headers = null;
        if (token){
            headers = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
        }
        axios.delete(`/api/vote/argument/${argumentId}`, headers)
        .then(response => {
            dispatch(deleteVoteSuccess(response.data));
        })
        .catch(error => {
            dispatch(voteFail(error));
        })
    }
};