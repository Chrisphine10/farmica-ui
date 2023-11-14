import { ActionTypes } from "../type";

// Define your initial state
const initialState = {
    regions: [],
    region: {},
    error: null,
};

// Define how your state should change for each action
const regionReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.CREATE_REGION:
            return { ...state, region: action.payload };
        case ActionTypes.UPDATE_REGION:
            return { ...state, region: action.payload };
        case ActionTypes.DELETE_REGION:
            return { ...state, region: action.payload };
        case ActionTypes.FETCH_REGION:
            return { ...state, region: action.payload };
        case ActionTypes.FETCH_REGIONS:
            return { ...state, regions: action.payload };
        case ActionTypes.ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default regionReducer;