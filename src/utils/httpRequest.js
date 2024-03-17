import axios from 'axios';
const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        Authorization: `Bearer ${ sessionStorage.getItem('authToken')}`,
    },
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response;
};


export const post = async (path, data) => {
    const response = await httpRequest.post(path, data);
    return response;
};
export const put = async (path, data) => {
    const response = await httpRequest.put(path, data);
    return response;
};
export const deleted = async (path) => {
    const response = await httpRequest.delete(path);
    return response;
};


export default httpRequest;
