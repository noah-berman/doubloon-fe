import { ADD_TRANSACTION } from './types';

export function addTransactionAction(value) {
  return { type: ADD_TRANSACTION, payload: value}
}
