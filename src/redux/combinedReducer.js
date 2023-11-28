import { combineReducers } from 'redux';
import authReducer from '../redux/auth/reducers/authReducer';
import batchReducer from '../redux/batch/reducers/batchReducer';
import lotReducer from '../redux/lot/reducers/lotReducer';
import styleReducer from '../redux/style/reducers/styleReducer';
import variableReducer from '../redux/variable/reducers/variableReducer';
import zonesReducer from '../redux/zones/reducers/zonesReducer';
import reworkReducer from '../redux/rework/reducers/reworkReducer';
import regionReducer from '../redux/region/reducers/regionReducer';
import warehouseReducer from '../redux/warehouse/reducers/warehouseReducer';
import salesReducer from '../redux/sales/reducers/salesReducer';
import reportReducer from './report/reducers/reportReducers';
import commentsReducer from './comment/reducers/commentsReducer';

const combinedReducer = combineReducers({
    auth: authReducer,
    batch: batchReducer,
    lot: lotReducer,
    style: styleReducer,
    variable: variableReducer,
    zones: zonesReducer,
    rework: reworkReducer,
    region: regionReducer,
    warehouse: warehouseReducer,
    sales: salesReducer,
    report: reportReducer,
    comments: commentsReducer,
});

export default combinedReducer;