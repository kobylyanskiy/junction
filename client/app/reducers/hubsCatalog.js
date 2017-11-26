import { createReducer } from '../utils';
import { HUBS_CATALOG_REQUEST, HUBS_CATALOG_SUCCESS, HUBS_CATALOG_FAILURE } from '../constants/actionTypes';
import { hubsCatalog } from '../constants/initialState';

export default createReducer(hubsCatalog, {
    [HUBS_CATALOG_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isRequesting: true,
            statusText: null
        });
    },
    [HUBS_CATALOG_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            isRequesting: false,
            statusText: payload.statusText
        });
    },
    [HUBS_CATALOG_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isRequesting: false,
            hubs: payload.hubs
        });
    }
});
