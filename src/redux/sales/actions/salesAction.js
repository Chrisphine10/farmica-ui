import baseAPI2 from '../../baseAPI2';
import baseAPI from '../../baseAPI';
import { ActionTypes } from "../type";
import { toast } from 'react-toastify';

export const createSale = (sale, warehouse, zone) => async (dispatch) => {
    try {
        const response = await baseAPI2.post('/sales-details', sale);
        // update warehouse
        const newWarehouse = {
            ...warehouse,
            numberOfCTNs: warehouse.numberOfCTNs - sale.numberOfCTNs,
        };
        const warehouseResponse = await baseAPI2.patch(`/warehouse-details/${warehouse.id}`, newWarehouse);
        const zoneResponse = await baseAPI2.put(`/packing-zone-details/${zone.id}`, zone);
        if (response.status === 201 && warehouseResponse.status === 200 && zoneResponse.status === 200) {
            toast.success('Sale created successfully!');
            dispatch({
                type: ActionTypes.CREATE_SALE,
                payload: response.data,
            });
        } else {
            toast.error('Sale creation failed!');
            dispatch({
                type: ActionTypes.ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        toast.error('Sale creation failed!');
        dispatch({
            type: ActionTypes.ERROR,
            payload: error,
        });
    }
}

export const updateSaleUiCode = (sale) => async (dispatch) => {
    console.log("Sale UI Code Updated ");
    try {
        const response = await baseAPI2.put(`/sales-details/${sale.id}`, sale);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.UPDATE_SALE,
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

export const updateSale = (sale, warehouse, originalNumber) => async (dispatch) => {
    try {
        const response = await baseAPI2.put(`/sales-details/${sale.id}`, sale);
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
        // update warehouse
        const newWarehouse = {
            ...warehouse,
            numberOfCTNs: (warehouse.numberOfCTNs + originalNumber) - sale.numberOfCTNs,
        };
        const warehouseResponse = await baseAPI2.put(`/warehouse-details/${warehouse.id}`, newWarehouse);
        if (response.status === 200 && warehouseResponse.status === 200) {
            toast.success('Sale updated successfully!');
            setSelectedSale(transformedResponse);
            dispatch({
                type: ActionTypes.UPDATE_SALE,
                payload: transformedResponse,
            });
        } else {
            toast.error('Sale update failed!');
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

export const deleteSale = (id) => async (dispatch) => {
    try {
        const response = await baseAPI2.delete(`/sales-details/${id}`);
        if (response.status === 200) {
            toast.success('Sale deleted successfully!');
            dispatch({
                type: ActionTypes.DELETE_SALE,
                payload: response.data,
            });
        } else {
            toast.error('Sale deletion failed!');
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

export const fetchSale = (id) => async (dispatch) => {
    try {
        const response = await baseAPI2.get(`/sales-details/${id}`);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_SALE,
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

export const fetchSales = () => async (dispatch) => {
    try {
        const response = await baseAPI2.get('/sales-details');

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
                type: ActionTypes.FETCH_SALES,
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

export const cleanUpSales = () => async (dispatch) => {
    dispatch({
        type: ActionTypes.CLEAN_UP,
    });
};

export const fetchSalesByStyle = (styleId) => async (dispatch) => {
    try {
        const response = await baseAPI2.get(`/style/${styleId}/sales`);
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
                type: ActionTypes.FETCH_SALES_BY_STYLE,
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
};

export const fetchSalesByLot = (lotId) => async (dispatch) => {
    try {
        const response = await baseAPI2.get(`/lot-details/${lotId}/sales-details`);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_SALES_BY_LOT,
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

export const setSelectedSale = (sale) => async (dispatch) => {
    dispatch({
        type: ActionTypes.FETCH_SALE,
        payload: sale,
    });
};

export const fetchSalesByUiCode = (uiCode) => async (dispatch) => {
    try {
        const response = await baseAPI2.get(`/sales-details/uicode/${uiCode}`);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_SALE,
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
