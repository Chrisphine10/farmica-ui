import baseAPI from '../../baseAPI';
import { ActionTypes } from "../type";

// Define your actions creators that will dispatch actions to your reducers
export const fetchBatches = () => async (dispatch) => {
    try {
        const response = await baseAPI.get("/batches");
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_BATCHES,
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

export const fetchBatch = (id) => async (dispatch) => {
    try {
        const response = await baseAPI.get(`/batches/${id}`);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_BATCH,
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

export const createBatch = (data) => async (dispatch) => {
    try {
        const response = await baseAPI.post("/batches", data);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.CREATE_BATCH,
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

export const updateBatch = (id, data) => async (dispatch) => {
    try {
        const response = await baseAPI.put(`/batches/${id}`, data);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.UPDATE_BATCH,
                payload: response.data,
            });
        } else {
            dispatch({
                type: ActionTypes.ERROR,
                payload: response.data,
            })
        }
    } catch (error) {
        dispatch({
            type: ActionTypes.ERROR,
            payload: error,
        });
    }
}

export const deleteBatch = (id) => async (dispatch) => {
    try {
        const response = await baseAPI.delete(`/batches/${id}`);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.DELETE_BATCH,
                payload: id,
            });
        } else {
            dispatch({
                type: ActionTypes.ERROR,
                payload: response.data,
            })
        }
    } catch (error) {
        dispatch({
            type: ActionTypes.ERROR,
            payload: error,
        });
    }
}

export const fetchBatchesByRegion = (regionId) => async (dispatch) => {
    try {
        const response = await baseAPI.get(`/batches/region/${regionId}`);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_BATCHES_BY_REGION,
                payload: response.data,
            });
        } else {
            dispatch({
                type: ActionTypes.ERROR,
                payload: response.data,
            })
        }
    } catch (error) {
        dispatch({
            type: ActionTypes.ERROR,
            payload: error,
        });
    }
};