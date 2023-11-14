import baseAPI from '../../baseAPI';
import { ActionTypes } from "../type";

// Define your actions creators that will dispatch actions to your reducer
export const fetchVariables = () => async (dispatch) => {
    try {
        const response = await baseAPI.get("/variables");
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_VARIABLES,
                payload: response.data,
            });
        } else {
            dispatch({
                type: ActionTypes.ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        dispatch({
            type: ActionTypes.ERROR,
            payload: error,
        });
    }
};

export const fetchVariable = (id) => async (dispatch) => {
    try {
        const response = await baseAPI.get(`/variables/${id}`);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_VARIABLE,
                payload: response.data,
            });
        } else {
            dispatch({
                type: ActionTypes.ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        dispatch({
            type: ActionTypes.ERROR,
            payload: error,
        });
    }
};

export const createVariable = (data) => async (dispatch) => {
    try {
        const response = await baseAPI.post("/variables", data);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.CREATE_VARIABLE,
                payload: response.data,
            });
        } else {
            dispatch({
                type: ActionTypes.ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        dispatch({
            type: ActionTypes.ERROR,
            payload: error,
        });
    }
};

export const updateVariable = (id, data) => async (dispatch) => {
    try {
        const response = await baseAPI.put(`/variables/${id}`, data);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.UPDATE_VARIABLE,
                payload: response.data,
            });
        } else {
            dispatch({
                type: ActionTypes.ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        dispatch({
            type: ActionTypes.ERROR,
            payload: error,
        });
    }
};

export const deleteVariable = (id) => async (dispatch) => {
    try {
        const response = await baseAPI.delete(`/variables/${id}`);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.DELETE_VARIABLE,
                payload: response.data,
            });
        } else {
            dispatch({
                type: ActionTypes.ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        dispatch({
            type: ActionTypes.ERROR,
            payload: error,
        });
    }
};