import axios from 'axios';
import { API_KEY, BASE_URL } from './baseConstants';

/* **************************\
Function: Get.
Explanation:
This Function is used for fetching the data from the server
and returns promise
============================
Creator: Ansari || Date: 2020-01-17
\************************** */


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
        .catch(function (error) {
            console.log('There has been a problem with your request operation: ' + error.message);
            throw error;
        });
}

/* **************************\
Function: Post.
Explanation:
This Function is used for posting  the data to the server
and returns promise
============================
Creator: Ansari || Date: 2020-01-17
\************************** */

function post(endUrl = '', payload) {
    return axios
        .post(`${BASE_URL + endUrl}`, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .catch(function (error) {
            console.log('There has been a problem with your request operation: ' + error.message);
            throw error;
        });
}

export {
    get,
    post
}