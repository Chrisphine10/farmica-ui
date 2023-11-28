import baseAPI from '../../baseAPI';
import baseAPI2 from '../../baseAPI2';
import { ActionTypes } from "../type";

// Define your actions creators that will dispatch actions to your reducers
export const fetchLots = () => async (dispatch) => {
    try {
        const response = await baseAPI.get("/lot-details");
        // fetch batch details for each lot and then fetch region details for each batch
        const transformedResponse = await Promise.all(response.data.map(async (lot) => {
            const batchResponse = await baseAPI.get(`/batch-details/${lot.batchDetail.id}`);
            const regionResponse = await baseAPI.get(`/regions/${batchResponse.data.region.id}`);
            return {
                ...lot,
                batch: batchResponse.data.batchNo,
                region: regionResponse.data.name,
                createdAt: new Date(lot.createdAt).toLocaleString(),
            };
        }));
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_LOTS,
                payload: transformedResponse,
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
        const response = await baseAPI.get(`/lot-details/${id}`);
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
        const response = await baseAPI.post("/lot-details", data);

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
        const response = await baseAPI.put(`/lot-details/${id}`, data);
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
        const response = await baseAPI.delete(`/lot-details/${id}`);
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

        console.log("id:", id);
        const response = await baseAPI2.get(`/batch-details/${id}/lot-details`);
        const transformedResponse = await Promise.all(response.data.map(async (lot) => {
            const batchResponse = await baseAPI.get(`/batch-details/${lot.batchDetail.id}`);
            const regionResponse = await baseAPI.get(`/regions/${batchResponse.data.region.id}`);
            return {
                ...lot,
                batch: batchResponse.data.batchNo,
                region: regionResponse.data.name,
                createdAt: new Date(lot.createdAt).toLocaleString(),
            };
        }));
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_LOTS_BY_BATCH,
                payload: transformedResponse,
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

export const setSelectedLot = (lot) => async (dispatch) => {
    dispatch({
        type: ActionTypes.FETCH_LOT,
        payload: lot,
    });
}