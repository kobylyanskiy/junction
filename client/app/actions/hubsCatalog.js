import { checkHttpStatus, parseJSON } from '../utils';
import { HUBS_CATALOG_REQUEST, HUBS_CATALOG_SUCCESS, HUBS_CATALOG_FAILURE } from '../constants/actionTypes';

export function getHubsCatalog() {
    return function(dispatch) {
        dispatch(getHubsCatalogRequest());
        return fetch('http://10.100.9.134:5000/get_hubs', {
            method: 'GET'
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then( response => {
                dispatch(getHubsCatalogSuccess(response));
            })
            .catch( error => {
                dispatch(getHubsCatalogFailure(error));
            })
    }
}

export function getHubsCatalogRequest() {
    return {
        type: HUBS_CATALOG_REQUEST
    }
}

export function getHubsCatalogSuccess(response) {
    return {
        type: HUBS_CATALOG_SUCCESS,
        payload: {
            hubs: response
        }
    }
}

export function getHubsCatalogFailure(error) {
    return {
        type: HUBS_CATALOG_FAILURE,
        payload: {
            statusText: error.response.statusText
        }
    }
}