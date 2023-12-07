import { ActionTypes } from "../type";

// Define your initial state
const initialState = {
    report: {},
    styleReport: [],
    historyReport: {},
    historyStyleReport: [],
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
        case ActionTypes.FETCH_REPORT_BY_MONTH_AND_YEAR:
            return { ...state, historyReport: action.payload };
        case ActionTypes.FETCH_STYLE_REPORT_BY_MONTH_AND_YEAR:
            return { ...state, historyStyleReport: action.payload };
        case ActionTypes.ERROR:
            return { ...state, error: action.payload, historyReport: {}, historyStyleReport: [] };
        case ActionTypes.CLEAN_UP:
            return { ...state, error: null, historyReport: {}, historyStyleReport: [] };
        default:
            return state;
    }
};

export default reportReducer;