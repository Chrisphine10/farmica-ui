import { ActionTypes } from "../type";

// Define your initial state
const initialState = {
    styles: [],
    style: {},
    error: null,
};

// Define how your state should change for each action
const styleReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.CREATE_STYLE:
            return { ...state, style: action.payload };
        case ActionTypes.UPDATE_STYLE:
            return { ...state, style: action.payload };
        case ActionTypes.DELETE_STYLE:
            return { ...state, style: action.payload };
        case ActionTypes.FETCH_STYLE:
            return { ...state, style: action.payload };
        case ActionTypes.FETCH_STYLES:
            return { ...state, styles: action.payload };
        case ActionTypes.ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default styleReducer;