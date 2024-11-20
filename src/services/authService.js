import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

const register = async (userData) => {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
};
const logout = async () => {
    const response = await axios.post(`${API_URL}/logout`);
    return response.data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    register,
    logout,
};