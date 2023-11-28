import { ActionTypes } from "../type";

// Define your initial state
const initialState = {
    comments: [],
    comment: {},
    error: null,
};

// Define your reducer function
const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_COMMENTS:
            return { ...state, comments: action.payload };
        case ActionTypes.FETCH_COMMENT:
            return { ...state, comment: action.payload };
        case ActionTypes.CREATE_COMMENT:
            return { ...state, comment: action.payload };
        case ActionTypes.UPDATE_COMMENT:
            return { ...state, comment: action.payload };
        case ActionTypes.DELETE_COMMENT:
            return { ...state, comment: action.payload };
        case ActionTypes.COMMENT_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

// Export your reducer function
export default commentsReducer;