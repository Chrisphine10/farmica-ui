import baseAPI2 from '../../baseAPI2';
import { ActionTypes } from "../type";
import { toast } from 'react-toastify';

export const fetchComments = (zone, status) => async (dispatch) => {
    try {
        const response = await baseAPI2.get('/comments/' + zone + '/' + status);
        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_COMMENTS,
                payload: response.data,
            });
        } else {
            dispatch({
                type: ActionTypes.ERROR,
                payload: response.data,
            });
        }
    }
    catch (error) {
        dispatch({
            type: ActionTypes.ERROR,
            payload: error,
        });
    }
}

export const fetchComment = (id) => async (dispatch) => {
    try {
        const response = await baseAPI2.get(`/comments/${id}`);
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_COMMENT,
                payload: response.data,
            });
        } else {
            dispatch({
                type: ActionTypes.ERROR,
                payload: response.data,
            });
        }
    }
    catch (error) {
        dispatch({
            type: ActionTypes.ERROR,
            payload: error,
        });
    }
}

export const createComment = (comment) => async (dispatch) => {
    try {
        const response = await baseAPI2.post('/comments', comment);
        if (response.status === 201) {
            toast.success('Comment created successfully!');
            dispatch({
                type: ActionTypes.CREATE_COMMENT,
                payload: response.data,
            });
        } else {
            toast.error('Comment creation failed!');
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

export const updateComment = (id, comment) => async (dispatch) => {
    try {
        const response = await baseAPI2.put(`/comments/${id}`, comment);
        if (response.status === 200) {
            toast.success('Comment updated successfully!');
            dispatch({
                type: ActionTypes.UPDATE_COMMENT,
                payload: response.data,
            });
        } else {
            toast.error('Comment update failed!');
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

export const deleteComment = (id) => async (dispatch) => {
    try {
        const response = await baseAPI2.delete(`/comments/${id}`);
        if (response.status === 200) {
            toast.success('Comment deleted successfully!');
            dispatch({
                type: ActionTypes.DELETE_COMMENT,
                payload: response.data,
            });
        } else {
            toast.error('Comment deletion failed!');
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
}