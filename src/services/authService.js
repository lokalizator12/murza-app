import axios from '../axiosConfig';

const register = async (userData) => {
    const response = await axios.post('auth/signup', userData);
    return response.data;
};
const logout = async () => {
    const response = await axios.post('auth/logout');
    return response.data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    register,
    logout,
};
