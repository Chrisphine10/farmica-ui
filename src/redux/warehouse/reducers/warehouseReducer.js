import { ActionTypes } from "../type";

// Define your initial state
const initialState = {
    warehouses: [],
    warehouse: {},
    error: null,
}

// Define your reducer that will return the initialState by default
const warehouseReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.CREATE_WAREHOUSE:
            return { ...state, warehouse: action.payload, error: null }
        case ActionTypes.UPDATE_WAREHOUSE:
            return { ...state, warehouse: action.payload, error: null }
        case ActionTypes.DELETE_WAREHOUSE:
            return { ...state, warehouse: action.payload, error: null }
        case ActionTypes.FETCH_WAREHOUSE:
            return { ...state, warehouse: action.payload, error: null }
        case ActionTypes.FETCH_WAREHOUSES:
            return { ...state, warehouses: action.payload, error: null }
        case ActionTypes.FETCH_WAREHOUSES_BY_STYLE:
            return { ...state, warehouses: action.payload, error: null }
        case ActionTypes.FETCH_WAREHOUSES_BY_LOT:
            return { ...state, warehouses: action.payload, error: null }
        case ActionTypes.ERROR:
            return { ...state, error: action.payload }
        case ActionTypes.CLEAN_UP:
            return { ...state, error: null, warehouse: {}, warehouses: [] }
        default:
            return state
    }
}

export default warehouseReducer

