import baseAPI2 from '../../baseAPI2';
import { ActionTypes } from "../type";

export const fetchReport = () => async (dispatch) => {
    try {
        const response = await baseAPI2.get(`/live-reports`);
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
        const response = await baseAPI2.get(`/live-style-reports`);
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

export const fetchReportByMonthAndYear = (month, year) => async (dispatch) => {
    try {
        const response = await baseAPI2.get(`/report-by-month-year/${month}/${year}`);
        if (response.status === 200) {
            console.log("test", response.data);
            dispatch({
                type: ActionTypes.FETCH_REPORT_BY_MONTH_AND_YEAR,
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


export const fetchStyleReportByMonthAndYear = (month, year) => async (dispatch) => {
    try {
        const response = await baseAPI2.get(`/style-report-by-month-year/${month}/${year}`);
        if (response.status === 200) {
            console.log("test", response.data);
            dispatch({
                type: ActionTypes.FETCH_STYLE_REPORT_BY_MONTH_AND_YEAR,
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

export const cleanUpReport = () => async (dispatch) => {
    dispatch({
        type: ActionTypes.CLEAN_UP,
    });
};