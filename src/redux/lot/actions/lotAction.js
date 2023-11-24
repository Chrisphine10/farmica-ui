import baseAPI from '../../baseAPI';
import { ActionTypes } from "../type";

// Define your actions creators that will dispatch actions to your reducers
export const fetchLots = () => async (dispatch) => {
    try {
        const response = await baseAPI.get("/lots");
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_LOTS,
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

export const fetchLot = (id) => async (dispatch) => {
    try {
        const response = await baseAPI.get(`/lots/${id}`);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_LOT,
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

export const createLot = (data) => async (dispatch) => {
    try {
        const response = await baseAPI.post("/lots", data);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.CREATE_LOT,
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

export const updateLot = (id, data) => async (dispatch) => {
    try {
        const response = await baseAPI.put(`/lots/${id}`, data);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.UPDATE_LOT,
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

export const deleteLot = (id) => async (dispatch) => {
    try {
        const response = await baseAPI.delete(`/lots/${id}`);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.DELETE_LOT,
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

export const fetchLotsByBatch = (id) => async (dispatch) => {
    try {
        const response = await baseAPI.get(`/batch-details/${id}/lot-details`);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_LOTS_BY_BATCH,
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

export const cleanUp = () => async (dispatch) => {
    dispatch({
        type: ActionTypes.CLEAN_UP,
    });
};