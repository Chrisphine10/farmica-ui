import { ActionTypes } from "../type";

// Define your initial state
const initialState = {
    reworks: [],
    rework: {},
    error: null,
    created: false,
};

// Define how your state should change for each action
const reworkReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.CREATE_REWORK:
            return { ...state, rework: action.payload, created: true };
        case ActionTypes.UPDATE_REWORK:
            return { ...state, rework: action.payload };
        case ActionTypes.DELETE_REWORK:
            return { ...state, rework: action.payload };
        case ActionTypes.FETCH_REWORK:
            return { ...state, rework: action.payload, created: false };
        case ActionTypes.FETCH_REWORKS:
            return { ...state, reworks: action.payload, created: false };
        case ActionTypes.FETCH_REWORKS_BY_LOT:
            return { ...state, reworks: action.payload };
        case ActionTypes.ERROR:
            return { ...state, error: action.payload };
        case ActionTypes.CLEAN_UP:
            return { ...state, error: null, created: false };
        default:
            return state;
    }
};

export default reworkReducer;