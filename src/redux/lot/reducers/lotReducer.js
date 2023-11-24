import { ActionTypes } from "../type";

// Define your initial state
const initialState = {
    lots: [],
    lot: {},
    error: null,
};

// Define how your state should change for each action
const lotReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.CREATE_LOT:
            return { ...state, lot: action.payload };
        case ActionTypes.UPDATE_LOT:
            return { ...state, lot: action.payload };
        case ActionTypes.DELETE_LOT:
            return { ...state, lot: action.payload };
        case ActionTypes.FETCH_LOT:
            return { ...state, lot: action.payload };
        case ActionTypes.FETCH_LOTS:
            return { ...state, lots: action.payload };
        case ActionTypes.FETCH_LOTS_BY_BATCH:
            return { ...state, lots: action.payload };
        case ActionTypes.ERROR:
            return { ...state, error: action.payload };
        case ActionTypes.CLEAN_UP:
            return { ...state, error: null, lot: {}, lots: [] };
        default:
            return state;
    }
};

export default lotReducer;