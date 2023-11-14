import baseAPI from '../../baseAPI';
import { ActionTypes } from "../type";

// Define your actions creators that will dispatch actions to your reducers
export const fetchStyles = () => async (dispatch) => {
    try {
        const response = await baseAPI.get("/styles");
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_STYLES,
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

export const fetchStyle = (id) => async (dispatch) => {
    try {
        const response = await baseAPI.get(`/styles/${id}`);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_STYLE,
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

export const createStyle = (data) => async (dispatch) => {
    try {
        const response = await baseAPI.post("/styles", data);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.CREATE_STYLE,
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

export const updateStyle = (id, data) => async (dispatch) => {
    try {
        const response = await baseAPI.put(`/styles/${id}`, data);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.UPDATE_STYLE,
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

export const deleteStyle = (id) => async (dispatch) => {
    try {
        const response = await baseAPI.delete(`/styles/${id}`);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.DELETE_STYLE,
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

