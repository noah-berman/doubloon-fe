import { SELECT_USER_BUDGET, SELECT_INITIAL_USER_BUDGET, FETCH_USER_BUDGETS, UPDATE_BUDGET_CATEGORY_INDEX, RESET } from '../Actions/types';

const initialState = {
  selectedBudget: null,
  selectedBudgetCategoriesIndex: null,
  lastUpdatedBudgetCategory: null
};

function budgetCategoriesReducer(state=initialState, action) {
  if (action.payload) {
  switch (action.type) {
    case SELECT_INITIAL_USER_BUDGET:
      if (!!action.payload.length) {
        let initialArrIndex = action.payload[0].budget_categories.map(el => {return {id: el.id, title: el.title}})
        return {...state, selectedBudgetCategoriesIndex: initialArrIndex};
      } else {return initialState}
    case SELECT_USER_BUDGET:
      let selectedArrIndex = action.payload.budget_categories.map(el => {return {id: el.id, title: el.title}})
      return {...state, selectedBudgetCategoriesIndex: selectedArrIndex}
    case UPDATE_BUDGET_CATEGORY_INDEX:
      return {...state, selectedBudgetCategoriesIndex: action.payload, lastUpdatedBudgetCategory: action.newCategory}
    case RESET:
      return initialState;
    default:
      return state;
    }
  } else {return state}
}

export default budgetCategoriesReducer;
