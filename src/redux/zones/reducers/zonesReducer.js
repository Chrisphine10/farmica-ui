import { ActionTypes } from "../type";

// Define your initial state
const initialState = {
    created: false,
    updated: false,
    zones: [],
    zone: {},
    error: null,
};

// Define how your state should change for each action
const zonesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.CREATE_ZONE:
            return { ...state, zone: action.payload, created: true };
        case ActionTypes.UPDATE_ZONE:
            return { ...state, zone: action.payload, updated: true };
        case ActionTypes.DELETE_ZONE:
            return { ...state, zone: action.payload };
        case ActionTypes.FETCH_ZONE:
            return { ...state, zone: action.payload };
        case ActionTypes.FETCH_ZONES:
            return { ...state, zones: action.payload, created: false, updated: false };
        case ActionTypes.ERROR:
            return { ...state, error: action.payload };
        case ActionTypes.CLEAN_UP:
            return { ...state, zone: {}, error: null, created: false, updated: false };
        case ActionTypes.FETCH_ZONES_BY_STYLE:
            return { ...state, zones: action.payload };
        case ActionTypes.FETCH_ZONES_BY_LOT:
            return { ...state, zones: action.payload };
        case ActionTypes.CLEAN_UP_CREATE:
            return { ...state, created: false };
        default:
            return state;
    }
};

// Export your reducer
export default zonesReducer;