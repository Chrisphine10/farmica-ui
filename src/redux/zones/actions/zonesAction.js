import baseAPI from '../../baseAPI';
import baseAPI2 from '../../baseAPI2';
import { ActionTypes } from "../type";
import { toast } from 'react-toastify';

export const createZone = (zone) => async (dispatch) => {
    try {
        const response = await baseAPI.post("/packing-zone-details", zone);
        // update uicode in the zone
        console.log(response.data);
        if (response.status === 201) {
            toast.success('Zone created successfully!');
            dispatch({
                type: ActionTypes.CREATE_ZONE,
                payload: response.data,
            });
        }
        else {
            toast.error('Zone creation failed!');
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
        console.log("response", response);
        if (response.status === 200) {
            toast.success('Zone updated successfully!');
            dispatch({
                type: ActionTypes.UPDATE_ZONE,
                payload: response.data,
            });
        } else {
            toast.error('Zone updation failed!');
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
        const lotResponse = await baseAPI.get(`/lot-details/${response.data.lotDetail.id}`);
        const styleResponse = await baseAPI.get(`/styles/${response.data.style.id}`);
        const batchResponse = await baseAPI.get(`/batch-details/${lotResponse.data.batchDetail.id}`);
        const regionResponse = await baseAPI.get(`/regions/${batchResponse.data.region.id}`);
        const transformedResponse = {
            ...response.data,
            lotNumber: lotResponse.data.lotNo,
            styleName: styleResponse.data.name,
            batchNumber: batchResponse.data.batchNo,
            regionName: regionResponse.data.name,
        };
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_ZONE,
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

export const fetchZones = () => async (dispatch) => {
    try {
        const response = await baseAPI.get("/packing-zone-details");
        // fetch lot details and style details and batch details
        const transformedResponse = await Promise.all(response.data.map(async (zone) => {
            const lotResponse = await baseAPI.get(`/lot-details/${zone.lotDetail.id}`);
            const styleResponse = await baseAPI.get(`/styles/${zone.style.id}`);
            const batchResponse = await baseAPI.get(`/batch-details/${lotResponse.data.batchDetail.id}`);
            const regionResponse = await baseAPI.get(`/regions/${batchResponse.data.region.id}`);
            return {
                ...zone,
                lotNumber: lotResponse.data.lotNo,
                styleName: styleResponse.data.name,
                batchNumber: batchResponse.data.batchNo,
                batchId: batchResponse.data.id,
                regionName: regionResponse.data.name,
                styleId: styleResponse.data.id,
            };
        }));
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_ZONES,
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

export const fetchZonesByStyle = (style) => async (dispatch) => {
    try {
        const response = await baseAPI2.get(`/style-details/${style}/parking-zone-details`);
        // fetch lot details and style details and batch details
        const transformedResponse = await Promise.all(response.data.map(async (zone) => {
            const lotResponse = await baseAPI.get(`/lot-details/${zone.lotDetail.id}`);
            const styleResponse = await baseAPI.get(`/styles/${zone.style.id}`);
            const batchResponse = await baseAPI.get(`/batch-details/${lotResponse.data.batchDetail.id}`);
            const regionResponse = await baseAPI.get(`/regions/${batchResponse.data.region.id}`);
            return {
                ...zone,
                lotNumber: lotResponse.data.lotNo,
                styleName: styleResponse.data.name,
                batchNumber: batchResponse.data.batchNo,
                batchId: batchResponse.data.id,
                regionName: regionResponse.data.name,
                styleId: styleResponse.data.id,
            };
        }));
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_ZONES_BY_STYLE,
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

export const fetchZonesByLot = (lot) => async (dispatch) => {
    try {
        const response = await baseAPI2.get(`/lot-details/${lot}/parking-zone-details`);
        // fetch lot details and style details and batch details
        const transformedResponse = await Promise.all(response.data.map(async (zone) => {
            const lotResponse = await baseAPI.get(`/lot-details/${zone.lotDetail.id}`);
            const styleResponse = await baseAPI.get(`/styles/${zone.style.id}`);
            const batchResponse = await baseAPI.get(`/batch-details/${lotResponse.data.batchDetail.id}`);
            const regionResponse = await baseAPI.get(`/regions/${batchResponse.data.region.id}`);
            return {
                ...zone,
                lotNumber: lotResponse.data.lotNo,
                styleName: styleResponse.data.name,
                batchNumber: batchResponse.data.batchNo,
                batchId: batchResponse.data.id,
                regionName: regionResponse.data.name,
                styleId: styleResponse.data.id,
            };
        }));
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_ZONES_BY_LOT,
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

export const setSelectedZone = (item) => async (dispatch) => {
    dispatch({
        type: ActionTypes.FETCH_ZONE,
        payload: item,
    });
}