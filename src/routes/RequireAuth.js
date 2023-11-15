import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../helpers/auth/AuthProvider';

export const RequireAuth = ({ children }) => {
    const auth = useAuth();
    const location = useLocation();

    if (auth.user === null) {
        // Check if a token exists in localStorage
        const storedToken = localStorage.getItem('token');
        console.log('storedToken', storedToken);
        if (storedToken === null) {
            return <Navigate to="/login" state={{ path: location.pathname }} />;
        }
    }
    return children;
};
