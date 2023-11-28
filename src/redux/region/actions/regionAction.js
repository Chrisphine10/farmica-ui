import baseAPI from '../../baseAPI';
import { ActionTypes } from "../type";

// Define your actions creators that will dispatch actions to your reducers
export const fetchRegions = () => async (dispatch) => {
    try {
        const response = await baseAPI.get("/regions");

        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_REGIONS,
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

export const fetchRegion = (id) => async (dispatch) => {
    try {
        const response = await baseAPI.get(`/regions/${id}`);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_REGION,
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

export const createRegion = (data) => async (dispatch) => {
    try {
        console.log(data);
        const response = await baseAPI.post("/regions", data);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.CREATE_REGION,
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

export const updateRegion = (id, data) => async (dispatch) => {
    try {
        const response = await baseAPI.put(`/regions/${id}`, data);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.UPDATE_REGION,
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

export const deleteRegion = (id) => async (dispatch) => {
    try {
        const response = await baseAPI.delete(`/regions/${id}`);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.DELETE_REGION,
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

export const setSelectedRegion = (region) => async (dispatch) => {
    dispatch({
        type: ActionTypes.FETCH_REGION,
        payload: region,
    });
}


