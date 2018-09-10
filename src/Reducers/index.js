import budgetsReducer from './budgetsReducer.js';
import chartsReducer from './chartsReducer.js';
import usersReducer from './usersReducer.js';
import transactionsReducer from './transactionsReducer.js';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ budget: budgetsReducer, chart: chartsReducer, user: usersReducer, transaction: transactionsReducer })

export default rootReducer;
