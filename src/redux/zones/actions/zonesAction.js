import baseAPI from '../../baseAPI';
import { ActionTypes } from "../type";

export const createZone = (zone) => async (dispatch) => {
    try {
        const response = await baseAPI.post("/packing-zone-details", zone);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.CREATE_ZONE,
                payload: response.data,
            });
        }
        else {
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

export const updateZone = (zone) => async (dispatch) => {
    try {
        const response = await baseAPI.put(`/packing-zone-details/${zone.id}`, zone);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.UPDATE_ZONE,
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

export const deleteZone = (zone) => async (dispatch) => {
    try {
        const response = await baseAPI.delete(`/packing-zone-details/${zone.id}`);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.DELETE_ZONE,
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

export const fetchZone = (id) => async (dispatch) => {
    try {
        const response = await baseAPI.get(`/packing-zone-details/${id}`);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_ZONE,
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

export const fetchZones = () => async (dispatch) => {
    try {
        const response = await baseAPI.get("/packing-zone-details");
        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_ZONES,
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

export const setSelectedZone = (item) => ({
    type: 'FETCH_ZONE',
    payload: item,
});