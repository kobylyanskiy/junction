import { createReducer } from '../utils';
import { SELECT_TRANSPORTATION, UPDATE_TRANSPORTATION_CATALOG_FILTER } from '../constants/actionTypes';
import { selectedTransportation } from '../constants/initialState';

export default createReducer(selectedTransportation, {
    [SELECT_TRANSPORTATION]: (state, payload) => {
        return Object.assign({}, state, {
            selected: payload.selected
        });
    },
    [UPDATE_TRANSPORTATION_CATALOG_FILTER]: (state, payload) => {
        return Object.assign({}, state, {
            catalogFilter: payload.catalogFilter
        })
    }
});
