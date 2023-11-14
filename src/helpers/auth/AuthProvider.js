// AuthProvider.js
import React, { createContext, useState, useContext } from 'react';
import { simpleLogin } from "../../redux/auth/actions/authAction";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const signin = async (username, password, rememberMe) => {
        try {
            var userData = await simpleLogin(username, password, rememberMe);
            if (userData === null) {
                return false;
            } else {
                setUser(userData.user);
                console.log("userData", userData);
                return true;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
        window.location.href = "/login";
    };


    return (
        <AuthContext.Provider value={{ user, signin, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
