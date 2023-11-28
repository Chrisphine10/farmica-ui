import baseAPI2 from '../../baseAPI2';
import { ActionTypes } from "../type";

export const fetchReport = () => async (dispatch) => {
    try {
        const response = await baseAPI2.get(`/last-reports`);
        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_REPORT,
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

export const fetchStyleReport = () => async (dispatch) => {
    try {
        const response = await baseAPI2.get(`/styles-report`);
        console.log(response.data);
        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_STYLE_REPORT,
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

export const generateReport = (report) => async (dispatch) => {
    try {
        const response = await baseAPI2.get('/generate-report');
        if (response.status === 201) {
            dispatch({
                type: ActionTypes.CREATE_REPORT,
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