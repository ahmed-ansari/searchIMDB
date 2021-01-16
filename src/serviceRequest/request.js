import axios from 'axios';
import { API_KEY, BASE_URL } from './baseConstants';

function get(endUrl = '', payload) {
    return axios
        .get(`${BASE_URL + endUrl}`,
            { params: { apikey: API_KEY, ...payload } },
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json:charset=utf-8'
                }
            })
}

function post(endUrl = '', payload) {
    return axios
        .post(`${BASE_URL + endUrl}`, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
}

export {
    get,
    post
}