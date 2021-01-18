import { get } from './request';
import { GET_MOVIES, GET_MOVIE } from './serviceConstants';

/* **************************\
Function: apiRequest.
Explanation:
This Function is used for requesting the srever
and returns promise
============================
Creator: Ansari || Date: 2020-01-17
\************************** */


function apiRequest(serviceName, payload) {
    switch (serviceName) {
        case GET_MOVIES:
            return get('', payload)
        case GET_MOVIE:
            return get('', payload);
        default:
            break;
    }
}

export default apiRequest;