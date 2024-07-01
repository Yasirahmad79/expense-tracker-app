import React, { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/expenses/ExpensesOutput";
import { ExpensesContext } from "../store/contextApi/expenses-context";
import { fetchExpense } from "../utility/http";
import LoadingOverlay from "../UI/LoadingOverlay";

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    async function getExpenses() {
      try {
        setIsFetching(true)
        const expenses = await fetchExpense();
        expensesCtx.setExpenses(expenses);
        setIsFetching(false)
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    }
    getExpenses();
  }, []);

  if (isFetching) {
    return <LoadingOverlay />
  }
  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod="Total"
      fallBackText="No expenses to show!!"
    />
  );
};

export default AllExpenses;
