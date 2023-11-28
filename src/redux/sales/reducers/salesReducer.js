import { ActionTypes } from "../type";

// Define your initial state
const initialState = {
    sales: [],
    sale: {},
    error: null,
}

// Define your reducer that will return the initialState by default
const salesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.CREATE_SALE:
            return { ...state, sale: action.payload, error: null }
        case ActionTypes.UPDATE_SALE:
            return { ...state, sale: action.payload, error: null }
        case ActionTypes.DELETE_SALE:
            return { ...state, sale: action.payload, error: null }
        case ActionTypes.FETCH_SALE:
            return { ...state, sale: action.payload, error: null }
        case ActionTypes.FETCH_SALES:
            return { ...state, sales: action.payload, error: null }
        case ActionTypes.FETCH_SALES_BY_STYLE:
            return { ...state, sales: action.payload, error: null }
        case ActionTypes.FETCH_SALES_BY_LOT:
            return { ...state, sales: action.payload, error: null }
        case ActionTypes.ERROR:
            return { ...state, error: action.payload }
        case ActionTypes.CLEAN_UP:
            return { ...state, error: null, sale: {}, sales: [] }
        default:
            return state
    }
}

export default salesReducer;