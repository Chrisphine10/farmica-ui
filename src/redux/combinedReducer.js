import { combineReducers } from 'redux';
import authReducer from '../redux/auth/reducers/authReducer';
import batchReducer from '../redux/batch/reducers/batchReducer';
import lotReducer from '../redux/lot/reducers/lotReducer';
import styleReducer from '../redux/style/reducers/styleReducer';
import variableReducer from '../redux/variable/reducers/variableReducer';
import zonesReducer from '../redux/zones/reducers/zonesReducer';

const combinedReducer = combineReducers({
    auth: authReducer,
    batch: batchReducer,
    lot: lotReducer,
    style: styleReducer,
    variable: variableReducer,
    zones: zonesReducer,
});

export default combinedReducer;