import { SET_BUDGET } from './types';

export function createBudgetAction(value) {
  return { type: SET_BUDGET, payload: value}
}
