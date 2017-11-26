import { createReducer } from '../utils';
import {
    TRANSPORTATION_CATALOG_REQUEST, TRANSPORTATION_CATALOG_FAILURE, TRANSPORTATION_CATALOG_SUCCESS
} from '../constants/actionTypes';
import { transportationCatalog } from '../constants/initialState';

export default createReducer(transportationCatalog, {
    [TRANSPORTATION_CATALOG_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isRequesting: true,
            statusText: null
        });
    },
    [TRANSPORTATION_CATALOG_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            isRequesting: false,
            statusText: payload.statusText
        });
    },
    [TRANSPORTATION_CATALOG_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isRequesting: false,
            catalog: payload.catalog
        });
    }
});
