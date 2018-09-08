import budgetsReducer from './budgetsReducer.js';
import chartsReducer from './chartsReducer.js';
import usersReducer from './usersReducer.js';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ budget: budgetsReducer, chart: chartsReducer, user: usersReducer })

export default rootReducer;
