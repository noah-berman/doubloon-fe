import BudgetReducer from './BudgetReducer.js';
import ChartReducer from './ChartReducer.js';
import UserReducer from './UserReducer.js';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ budget: BudgetReducer, chart: ChartReducer, user: UserReducer })

export default rootReducer;
