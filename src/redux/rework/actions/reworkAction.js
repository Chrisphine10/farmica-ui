import baseAPI from '../../baseAPI';
import baseAPI2 from '../../baseAPI2';
import { ActionTypes } from "../type";
import { toast } from 'react-toastify';

// Define your actions creators that will dispatch actions to your reducers
export const fetchReworks = () => async (dispatch) => {
    try {
        const response = await baseAPI2.get("/rework-details");
        const transformedResponse = await Promise.all(response.data.map(async (rework) => {
            const lotResponse = await baseAPI.get(`/lot-details/${rework.lotDetail.id}`);
            const batchResponse = await baseAPI.get(`/batch-details/${lotResponse.data.batchDetail.id}`);
            const regionResponse = await baseAPI.get(`/regions/${batchResponse.data.region.id}`);
            return {
                ...rework,
                lotNumber: lotResponse.data.lotNo,
                batchNumber: batchResponse.data.batchNo,
                regionName: regionResponse.data.name,
            };
        }));
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_REWORKS,
                payload: transformedResponse,
            });
        } else {
            dispatch({
                type: ActionTypes.ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        console.log("error: ", error);
        dispatch({
            type: ActionTypes.ERROR,
            payload: error,
        });
    }
};

export const fetchRework = (id) => async (dispatch) => {
    try {
        const response = await baseAPI2.get(`/rework-details/${id}`);
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

export const createRework = (data, warehouse) => async (dispatch) => {
    try {
        const response = await baseAPI2.post("/rework-details", data);
        // update warehouse
        const newWarehouse = {
            ...warehouse,
            quantity: warehouse.numberOfCTNs - data.numberOfCTNs,
        };
        const warehouseResponse = await baseAPI2.put(`/warehouse-details/${warehouse.id}`, newWarehouse);
        if (response.status === 201 && warehouseResponse.status === 200) {
            toast.success('Rework created successfully!');
            dispatch({
                type: ActionTypes.CREATE_REWORK,
                payload: response.data,
            });
        } else {
            toast.error('Rework creation failed!');
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

export const updateRework = (data, warehouse, originalNumber) => async (dispatch) => {
    try {
        const response = await baseAPI2.put(`/rework-details/${data.id}`, data);
        console.log(response);
        // update warehouse
        const newWarehouse = {
            ...warehouse,
            quantity: (warehouse.numberOfCTNs + originalNumber) - data.numberOfCTNs,
        };
        const warehouseResponse = await baseAPI2.put(`/warehouse-details/${warehouse.id}`, newWarehouse);

        if (response.status === 200 && warehouseResponse.status === 200) {
            toast.success('Rework updated successfully!');
            dispatch({
                type: ActionTypes.UPDATE_REWORK,
                payload: response.data,
            });
        } else {
            toast.error('Rework update failed!');
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
        const response = await baseAPI2.delete(`/rework-details/${id}`);
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

export const fetchReworksByLot = (lotId) => async (dispatch) => {
    try {
        const response = await baseAPI2.get(`/lot-details/${lotId}/rework-details`);
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

export const cleanUp = () => async (dispatch) => {
    dispatch({
        type: ActionTypes.CLEAN_UP,
    });
};

export const setSelectedRework = (rework) => async (dispatch) => {
    dispatch({
        type: ActionTypes.FETCH_REWORK,
        payload: rework,
    });
}