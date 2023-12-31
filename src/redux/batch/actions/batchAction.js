import baseAPI from '../../baseAPI';
import { ActionTypes } from "../type";
import { toast } from 'react-toastify';

// Define your actions creators that will dispatch actions to your reducers
export const fetchBatches = () => async (dispatch) => {
    try {
        const response = await baseAPI.get("/batch-details");
        // fetch region details for each batch
        const transformedResponse = await Promise.all(response.data.map(async (batch) => {
            const regionResponse = await baseAPI.get(`/regions/${batch.region.id}`);
            return {
                ...batch,
                region: regionResponse.data.name,
                createdAt: new Date(batch.createdAt).toLocaleString(),
            };
        }));
        console.log(transformedResponse);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_BATCHES,
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

export const fetchBatch = (id) => async (dispatch) => {
    try {
        const response = await baseAPI.get(`/batch-details/${id}`);
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
        console.log(data);
        const response = await baseAPI.post("/batch-details", data);
        if (response.status === 201) {
            toast.success('Batch created successfully!');
            dispatch({
                type: ActionTypes.CREATE_BATCH,
                payload: response.data,
            });
        } else {
            toast.error('Batch creation failed!');
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
        const response = await baseAPI.put(`/batch-details/${id}`, data);
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
        const response = await baseAPI.delete(`/batch-details/${id}`);
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
        const response = await baseAPI.get(`/region/${regionId}/batch-details`);
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

//clean up
export const cleanup = () => async (dispatch) => {
    dispatch({
        type: ActionTypes.CLEANUP,
    });
}

export const setSelectedBatch = (batch) => async (dispatch) => {
    dispatch({
        type: ActionTypes.FETCH_BATCH,
        payload: batch,
    });
}