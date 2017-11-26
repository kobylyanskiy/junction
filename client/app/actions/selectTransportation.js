import { SELECT_TRANSPORTATION, UPDATE_TRANSPORTATION_CATALOG_FILTER } from '../constants/actionTypes';


export function selectTransportation(transportation) {
    return {
        type: SELECT_TRANSPORTATION,
        payload: {
            selected: Object.assign({}, transportation)
        }
    }
}

export function updateTransportationCatalogFilter(catalogFilter) {
    return {
        type: UPDATE_TRANSPORTATION_CATALOG_FILTER,
        payload: {
            catalogFilter: catalogFilter
        }
    }
}