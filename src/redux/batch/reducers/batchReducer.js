import { ActionTypes } from "../type";

// Define your initial state
const initialState = {
    batches: [],
    batch: {},
    error: null,
};

// Define how your state should change for each action
const batchReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.CREATE_BATCH:
            return { ...state, batch: action.payload };
        case ActionTypes.UPDATE_BATCH:
            return { ...state, batch: action.payload };
        case ActionTypes.DELETE_BATCH:
            return { ...state, batch: action.payload };
        case ActionTypes.FETCH_BATCH:
            return { ...state, batch: action.payload };
        case ActionTypes.FETCH_BATCHES:
            return { ...state, batches: action.payload };
        case ActionTypes.FETCH_BATCHES_BY_REGION:
            return { ...state, batches: action.payload };
        case ActionTypes.ERROR:
            return { ...state, error: action.payload };
        case ActionTypes.CLEAN_UP:
            return { ...state, error: null, batch: {}, batches: [] };
        default:
            return state;
    }
};

export default batchReducer;
