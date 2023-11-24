import { ActionTypes } from "../type";

// Define your initial state
const initialState = {
    zones: [],
    zone: {},
    error: null,
};

// Define how your state should change for each action
const zonesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.CREATE_ZONE:
            return { ...state, zone: action.payload };
        case ActionTypes.UPDATE_ZONE:
            return { ...state, zone: action.payload };
        case ActionTypes.DELETE_ZONE:
            return { ...state, zone: action.payload };
        case ActionTypes.FETCH_ZONE:
            return { ...state, zone: action.payload };
        case ActionTypes.FETCH_ZONES:
            return { ...state, zones: action.payload };
        case ActionTypes.ERROR:
            return { ...state, error: action.payload };
        case ActionTypes.CLEAN_UP:
            return { ...state, zones: [], zone: {}, error: null }
        case ActionTypes.FETCH_ZONES_BY_STYLE:
            return { ...state, zones: action.payload };
        case ActionTypes.FETCH_ZONES_BY_LOT:
            return { ...state, zones: action.payload };
        default:
            return state;
    }
};

// Export your reducer
export default zonesReducer;