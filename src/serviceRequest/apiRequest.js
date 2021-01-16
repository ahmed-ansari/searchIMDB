import { get } from './request';
import { GET_MOVIES, GET_MOVIE } from './serviceConstants';

function apiRequest(serviceName, payload) {
    switch (serviceName) {
        case GET_MOVIES:
            return get('', payload);
        case GET_MOVIE:
            return get('', payload);
        default:
            break;
    }
}

export default apiRequest;