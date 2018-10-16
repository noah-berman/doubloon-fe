import { SELECT_USER_BUDGET, SELECT_INITIAL_USER_BUDGET, FETCH_USER_BUDGETS, RESET } from '../Actions/types';

const initialState = {
  selectedBudget: null,
  selectedBudgetCategoriesIndex: null
};

function budgetCategoriesReducer(state=initialState, action) {
  if (action.payload) {
  switch (action.type) {
    case SELECT_INITIAL_USER_BUDGET:
      let initialArrIndex = action.payload[0].budget_categories.map(el => {return {id: el.id, title: el.title}})
      return {...state, selectedBudgetCategoriesIndex: initialArrIndex};
    case SELECT_USER_BUDGET:
      let selectedArrIndex = action.payload.budget_categories.map(el => {return {id: el.id, title: el.title}})
      console.log(selectedArrIndex)
      return {...state, selectedBudgetCategoriesIndex: selectedArrIndex}
    case RESET:
      return initialState
    default:
      return state;
    }
  } else {return state}
}

export default budgetCategoriesReducer;
