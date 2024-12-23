import { jwtDecode } from 'jwt-decode';

export const getLoggedInUserId = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.userId;
    }
    return null;
};