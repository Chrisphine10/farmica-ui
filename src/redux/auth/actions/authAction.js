// import baseAPI from '../../baseAPI';
import authAPI from '../../authAPI';
import { ActionTypes } from "../type";
import { toast } from 'react-toastify';

export const login = (login, password, rememberMe) => {
    return async function (dispatch, getState) {
        try {
            const response = await authAPI.post("authenticate", {
                "password": password,
                "rememberMe": rememberMe,
                "username": login
            });

            if (response.status === 200) {
                toast.success("Login successful");
                localStorage.setItem('token', response.data.id_token);
                localStorage.setItem('login', login);
                localStorage.setItem('userId', response.data.user.id);
                localStorage.setItem('userEmail', response.data.user.email);
                dispatch({
                    type: ActionTypes.LOGIN_SUCCESS,
                    payload: response.data.user
                });
            } else {
                toast.error("Login failed");
                localStorage.clear();
                dispatch({
                    type: ActionTypes.LOGIN_FAIL,
                    payload: response.data
                });
            }
        } catch (error) {
            toast.error("Login failed");
            localStorage.clear();
            console.log(error);
            dispatch({
                type: ActionTypes.LOGIN_FAIL,
                payload: error
            });
        }
    }

}

export const simpleLogin = async (login, password, rememberMe) => {
    try {
        const response = await authAPI.post("authenticate", {
            "password": password,
            "rememberMe": rememberMe,
            "username": login
        });
        if (response.status === 200) {
            toast.success("Login successful");
            localStorage.setItem('token', response.data.id_token);
            localStorage.setItem('login', login);
            localStorage.setItem('userId', response.data.user.id);
            localStorage.setItem('userEmail', response.data.user.email);
            return response.data;
        } else {
            toast.error("Login failed");
            localStorage.clear();
            return null;
        }
    } catch (error) {
        toast.error("Login failed");
        localStorage.clear();
        console.log(error);
        return null;
    }
}

export const register = (data) => async (dispatch, getState) => {
    try {
        console.log(data);
        const response = await authAPI.post("register", data);
        if (response.status === 201) {
            toast.success("Registration successful");
            dispatch({
                type: ActionTypes.REGISTER_SUCCESS,
                payload: response.data
            });
        } else {
            toast.error("Registration failed");
            dispatch({
                type: ActionTypes.REGISTER_FAIL,
                payload: response.data
            });
        }
    } catch (error) {
        toast.error("Registration failed");
        dispatch({
            type: ActionTypes.REGISTER_FAIL,
            payload: error
        });
    }
}



export const activate = (key) => async (dispatch, getState) => {
    const response = await authAPI.get(`activate?key=${key}`);

    if (response.status === 200) {
        dispatch({
            type: ActionTypes.ACTIVATE_USER,
            payload: response.data
        });
    } else {
        dispatch({
            type: ActionTypes.LOGIN_FAIL,
            payload: response.data
        });
    }
}

export const requestPasswordReset = (email) => async (dispatch, getState) => {
    try {
        const response = await authAPI.post("account/reset-password/init", email);

        if (response.status === 200) {
            dispatch({
                type: ActionTypes.REQUEST_PASSWORD_RESET,
                payload: response.data
            });
        } else {
            dispatch({
                type: ActionTypes.LOGIN_FAIL,
                payload: response.data
            });
        }
    } catch (error) {
        dispatch({
            type: ActionTypes.LOGIN_FAIL,
            payload: error
        });
    }
}

export const finishPasswordReset = (data) => async (dispatch, getState) => {
    const response = await authAPI.post("account/reset-password/finish", data);

    if (response.status === 200) {
        dispatch({
            type: ActionTypes.FINISH_PASSWORD_RESET,
            payload: response.data
        });
    } else {
        dispatch({
            type: ActionTypes.LOGIN_FAIL,
            payload: response.data
        });
    }
}

export const changePassword = (data) => async (dispatch, getState) => {
    const response = await authAPI.post("account/change-password", data);

    if (response.status === 200) {
        dispatch({
            type: ActionTypes.CHANGE_PASSWORD,
            payload: response.data
        });
    } else {
        dispatch({
            type: ActionTypes.LOGIN_FAIL,
            payload: response.data
        });
    }
}

export const getUser = () => async (dispatch, getState) => {
    try {
        const response = await authAPI.get("account");
        if (response.status === 200) {
            dispatch({
                type: ActionTypes.FETCH_USER_DETAIL,
                payload: response.data
            });
        } else {
            dispatch({
                type: ActionTypes.LOGIN_FAIL,
                payload: response.data
            });
        }
    } catch (error) {
        dispatch({
            type: ActionTypes.LOGIN_FAIL,
            payload: error
        });
    }
}

export const updateUser = (id, data) => async (dispatch, getState) => {
    try {
        const response = await authAPI.put("admin/users/" + id, data);

        if (response.status === 200) {
            dispatch({
                type: ActionTypes.UPDATE_USER,
                payload: response.data
            });
        } else {
            dispatch({
                type: ActionTypes.LOGIN_FAIL,
                payload: response.data
            });
        }
    } catch (error) {
        dispatch({
            type: ActionTypes.LOGIN_FAIL,
            payload: null
        });
    }
}

export const deleteUser = (login) => async (dispatch, getState) => {
    const response = await authAPI.delete("admin/users/" + login);

    if (response.status === 200) {
        dispatch({
            type: ActionTypes.DELETE_USER,
            payload: response.data
        });
    } else {
        dispatch({
            type: ActionTypes.LOGIN_FAIL,
            payload: response.data
        });
    }
}

