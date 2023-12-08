import baseAPI2 from '../../baseAPI2';
import baseAPI from '../../baseAPI';
import { ActionTypes } from "../type";
import { toast } from 'react-toastify';

export const createWarehouse = (warehouse, zone) => async (dispatch) => {
    try {
        const response = await baseAPI2.post('/warehouse-details', warehouse);
        // update package zone details number of ctns
        let numberOfCTNsInWarehouse = zone.numberOfCTNsInWarehouse !== null ? parseInt(zone.numberOfCTNsInWarehouse) + parseInt(warehouse.numberOfCTNs) : warehouse.numberOfCTNs;
        let numberOfCTNs = zone.numberOfCTNs - warehouse.numberOfCTNs;
        const newZone = {
            ...zone,
            numberOfCTNs: numberOfCTNs,
            numberOfCTNsInWarehouse: numberOfCTNsInWarehouse,
        };
        console.log(zone)
        const zoneResponse = await baseAPI.put(`/packing-zone-details/${zone.id}`, newZone);
        if (response.status === 201 && zoneResponse.status === 200) {
            toast.success('Warehouse created!');
            dispatch({
                type: ActionTypes.CREATE_WAREHOUSE,
                payload: response.data,
            });
        } else {
            toast.error('Warehouse creation failed!');
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

export const updateWarehouseUicode = (warehouse) => async (dispatch) => {
    try {
        const response = await baseAPI2.put(`/warehouse-details/${warehouse.id}`, warehouse);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.UPDATE_WAREHOUSE,
                payload: response.data,
            });
        } else {
            dispatch({
                type: ActionTypes.ERROR,
                payload: response.data,
            })
        }
    }
    catch (error) {
        dispatch({
            type: ActionTypes.ERROR,
            payload: error,
        });
    }
}

export const updateWarehouse = (warehouse, zone, originalNumber) => async (dispatch) => {
    try {
        const response = await baseAPI2.put(`/warehouse-details/${warehouse.id}`, warehouse);
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
        // update package zone details number of ctns
        const newZone = {
            ...zone,
            numberOfCTNs: (zone.numberOfCTNs + originalNumber) - warehouse.numberOfCTNs,
        };
        const zoneResponse = await baseAPI.put(`/packing-zone-details/${zone.id}`, newZone);
        if (response.status === 200 && zoneResponse.status === 200) {
            toast.success('Warehouse updated!');
            setSelectedWarehouse(transformedResponse);
            dispatch({
                type: ActionTypes.UPDATE_WAREHOUSE,
                payload: transformedResponse,
            });
        } else {
            toast.error('Warehouse update failed!');
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

export const deleteWarehouse = (id) => async (dispatch) => {
    try {
        const response = await baseAPI2.delete(`/warehouse-details/${id}`);
        if (response.status === 200) {
            toast.success('Warehouse deleted!');
            dispatch({
                type: ActionTypes.DELETE_WAREHOUSE,
                payload: response.data,
            });
        } else {
            toast.error('Warehouse deletion failed!');
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

export const fetchWarehouse = (id) => async (dispatch) => {
    try {
        const response = await baseAPI2.get(`/warehouse-details/${id}`);
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
                type: ActionTypes.FETCH_WAREHOUSE,
                payload: transformedResponse,
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

export const fetchWarehouses = () => async (dispatch) => {
    try {
        const response = await baseAPI2.get('/warehouse-details');
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
                regionName: regionResponse.data.name,
            };
        }));
        if (response.status === 200) {
            console.log(transformedResponse);
            dispatch({
                type: ActionTypes.FETCH_WAREHOUSES,
                payload: transformedResponse,
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

export const fetchWarehousesByLot = (lot) => async (dispatch) => {
    try {
        const response = await baseAPI2.get(`/lot-details/${lot}/warehouse-details`);
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
                regionName: regionResponse.data.name,
            };
        }));
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_WAREHOUSES_BY_LOT,
                payload: transformedResponse
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

export const fetchWarehousesByStyle = (style) => async (dispatch) => {
    try {
        const response = await baseAPI2.get(`/style/${style}/warehouse-details`);
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
                regionName: regionResponse.data.name,
            };
        }));
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_WAREHOUSES_BY_STYLE,
                payload: transformedResponse,
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

export const fetchWarehouseByUicode = (uicode) => async (dispatch) => {
    try {
        const response = await baseAPI2.get(`/warehouse-details/uicode${uicode}`);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_WAREHOUSE,
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

export const cleanUp = () => async (dispatch) => {
    dispatch({
        type: ActionTypes.CLEAN_UP,
    });
};

export const setSelectedWarehouse = (warehouse) => async (dispatch) => {
    dispatch({
        type: ActionTypes.FETCH_WAREHOUSE,
        payload: warehouse,
    });
};

