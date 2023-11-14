import { ActionTypes } from "../type";

// Define your initial state
const initialState = {
    isAuthenticated: false,
    user: null, // You might want to initialize with an empty user object
    passwordResetRequested: false,
    error: null,
    registrationHolder: null
};

// Create a reducer function
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.REGISTER_USER:
            return { ...state, user: action.payload };

        case ActionTypes.LOGIN_SUCCESS:
            return { ...state, isAuthenticated: true, user: action.payload };

        case ActionTypes.LOGIN_FAIL:
            return { ...state, error: action.payload };

        case ActionTypes.REGISTER_SUCCESS:
            return { ...state, user: action.payload };

        case ActionTypes.REGISTER_FAIL:
            return { ...state, error: action.payload };

        case ActionTypes.DELETE_USER:
            return { ...state, user: null };

        case ActionTypes.UPDATE_USER:
            return { ...state, user: action.payload };

        case ActionTypes.REQUEST_PASSWORD_RESET:
            return { ...state, passwordResetRequested: true };

        case ActionTypes.FINISH_PASSWORD_RESET:
            return { ...state, passwordResetRequested: false };

        case ActionTypes.CHANGE_PASSWORD:
            return { ...state };

        case ActionTypes.ACTIVATE_USER:
            return { ...state };

        case ActionTypes.FETCH_USER_DETAIL:
            return { ...state, user: action.payload };

        default:
            return state;
    }
};

export default authReducer;
