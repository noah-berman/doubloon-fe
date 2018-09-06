import { ADD_TRANSACTION, SET_BUDGET } from './types';

export function addTransactionAction(value) {
  return { type: ADD_TRANSACTION, payload: value}
}

export function createBudgetAction(value) {
  return { type: SET_BUDGET, payload: value}
}
