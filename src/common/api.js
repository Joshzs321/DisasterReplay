import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000/'
export const postRequest = (url, params, headers = { 'Content-Type': 'application/json' }) => {
    console.log(params);
    
    return axios({
        method: 'post',
        url,
        data: params,
        // transformRequest: [function (data) {
        //     let req = '';
        //     for (const key in data) {
        //         req += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&'
        //     }
        //     return req.slice(0,-1);
        // }],
        headers,
    });
};

export const getRequest = (url, params, headers = { 'Content-Type': 'application/json' }) => {
    return axios({
        method: 'get',
        url,
        data:params,
        // credentials: true,
        transformRequest: [function (data) {
            let req = '';
            for (const key in data) {
                req += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&'
            }
            return req.slice(0,-1);
        }],
        headers,
    },{withCredentials: true});
}
export const imgRequest = (url, params, headers = { 'Content-Type': 'multipart/form-data' }) => {
    return axios({
        method: 'post',
        url,
        data: params,
        headers,
    });
}