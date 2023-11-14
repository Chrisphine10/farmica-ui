import { ActionTypes } from "../type";

// Define your initial state
const initialState = {
    variables: [],
    variable: {},
    error: null,
};

// Define how your state should change for each action
const variableReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.CREATE_VARIABLE:
            return { ...state, variable: action.payload };
        case ActionTypes.UPDATE_VARIABLE:
            return { ...state, variable: action.payload };
        case ActionTypes.DELETE_VARIABLE:
            return { ...state, variable: action.payload };
        case ActionTypes.FETCH_VARIABLE:
            return { ...state, variable: action.payload };
        case ActionTypes.FETCH_VARIABLES:
            return { ...state, variables: action.payload };
        case ActionTypes.ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default variableReducer;