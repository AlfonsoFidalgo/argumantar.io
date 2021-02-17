import axios from 'axios';

export const AGREE = 'AGREE';
export const DISAGREE = 'DISAGREE';
export const REMOVE_AGREE = 'REMOVE_AGREE';
export const REMOVE_DISAGREE = 'REMOVE_DISAGREE';
export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';

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