import { ActionTypes } from "../type";

// Define your initial state
const initialState = {
    report: {},
    styleReport: {},
    error: null,
};

// Define how your state should change for each action
const reportReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_REPORT:
            return { ...state, report: action.payload };
        case ActionTypes.CREATE_REPORT:
            return { ...state };
        case ActionTypes.FETCH_STYLE_REPORT:
            return { ...state, styleReport: action.payload };
        case ActionTypes.ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default reportReducer;