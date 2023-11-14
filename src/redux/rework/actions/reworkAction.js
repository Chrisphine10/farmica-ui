import baseAPI from '../../baseAPI';
import { ActionTypes } from "../type";

// Define your actions creators that will dispatch actions to your reducers
export const fetchReworks = () => async (dispatch) => {
    try {
        const response = await baseAPI.get("/reworks");
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_REWORKS,
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

export const fetchRework = (id) => async (dispatch) => {
    try {
        const response = await baseAPI.get(`/reworks/${id}`);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_REWORK,
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
}

export const createRework = (data) => async (dispatch) => {
    try {
        const response = await baseAPI.post("/reworks", data);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.CREATE_REWORK,
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

export const updateRework = (id, data) => async (dispatch) => {
    try {
        const response = await baseAPI.put(`/reworks/${id}`, data);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.UPDATE_REWORK,
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

export const deleteRework = (id) => async (dispatch) => {
    try {
        const response = await baseAPI.delete(`/reworks/${id}`);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.DELETE_REWORK,
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

export const fetchReworksByLot = (lot) => async (dispatch) => {
    try {
        const response = await baseAPI.get(`/reworks/lot/${lot}`);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_REWORKS_BY_LOT,
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