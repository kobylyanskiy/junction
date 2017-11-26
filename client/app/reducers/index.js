import { combineReducers } from 'redux';
import auth from './auth';
import selectedTransportation from './selectedTransportation';
import transportationCatalog from './transportationCatalog';
import hubsCatalog from './hubsCatalog';

const rootReducer = combineReducers({
    auth,
    selectedTransportation,
    transportationCatalog,
    hubsCatalog
});

export default rootReducer;
