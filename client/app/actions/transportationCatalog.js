import { checkHttpStatus, parseJSON } from '../utils';
import {
    TRANSPORTATION_CATALOG_REQUEST, TRANSPORTATION_CATALOG_FAILURE, TRANSPORTATION_CATALOG_SUCCESS
} from '../constants/actionTypes';


export function getTransportationCatalog() {
    return function(dispatch) {
        dispatch(getTransportationCatalogRequest());
        return fetch('http://10.100.9.134:5000/get_trailers', {
            method: 'GET'
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then( response => {
                dispatch(getTransportationCatalogSuccess(response));
            })
            .catch( error => {
                dispatch(getTransportationCatalogFailure(error));
            })
    }
}

export function getTransportationCatalogRequest() {
    return {
        type: TRANSPORTATION_CATALOG_REQUEST
    }
}

export function getTransportationCatalogSuccess(response) {
    return {
        type: TRANSPORTATION_CATALOG_SUCCESS,
        payload: {
            catalog: response
        }
    }
}

export function getTransportationCatalogFailure(error) {
    return {
        type: TRANSPORTATION_CATALOG_FAILURE,
        payload: {
            statusText: error.response.statusText
        }
    }
}


