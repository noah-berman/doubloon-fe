import budgetsReducer from './budgetsReducer.js';
import usersReducer from './usersReducer.js';
import transactionsReducer from './transactionsReducer.js';
import budgetCategoriesReducer from './budgetCategoriesReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ budget: budgetsReducer, user: usersReducer, transaction: transactionsReducer, budgetCategory: budgetCategoriesReducer })

export default rootReducer;
