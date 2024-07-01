import { createContext, useReducer } from "react";


export const ExpensesContext = createContext({
  expenses: [],
  addExpenses: ({description, amount, date}) => {},
  setExpenses: (id) => {},
  deleteExpenses: (id) => {},
  updateExpenses: (id, {description, amount, date}) => {},
});

function expenseReducer(state, action) {
  switch (action.type) {
    case "ADD":
        const id = new Date().toString() + Math.random().toString();
        return [{...action.payload, id: id}, ...state];
    case "SET":
      return action.payload
    case "UPDATE":
        const updateExpenseIndex = state.findIndex((expense)=> expense.id === action.payload.id);
        const updatableExpense = state[updateExpenseIndex];
        const updateItem = {...updatableExpense, ...action.payload.data};
        const updatedExpense = [...state];
        updatedExpense[updateExpenseIndex] = updateItem;
        return updatedExpense;
    case "DELETE":
        return state.filter((expense)=> expense.id !== action.payload)
    default:
      return state;
  }
}
function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expenseReducer, []);
  function addExpenses(expenseData) {
    dispatch({type: 'ADD', payload: expenseData})
  }
  function deleteExpenses(id) {
    dispatch({type: 'DELETE', payload: id})
  }
  function setExpenses(expenses) {
    dispatch({type: "SET", payload: expenses})
  }
  function updateExpenses(id, expenseData) {
    dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}})
  }
  const value = {
    expenses : expensesState,
    addExpenses: addExpenses,
    setExpenses: setExpenses,
    deleteExpenses: deleteExpenses,
    updateExpenses: updateExpenses
  }
  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}
export default ExpensesContextProvider;
