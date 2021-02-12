export const AGREE = 'AGREE';
export const DISAGREE = 'DISAGREE';
export const REMOVE_AGREE = 'REMOVE_AGREE';
export const REMOVE_DISAGREE = 'REMOVE_DISAGREE';

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