import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/expenses/ExpensesOutput";
import { ExpensesContext } from "../store/contextApi/expenses-context";
import { getDateMinusDays } from "../utility/date";
import { fetchExpense } from "../utility/http";
import LoadingOverlay from "../UI/LoadingOverlay";

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function getExpense() {
      setIsFetching(true);
      const expenses = await fetchExpense();
      setIsFetching(false);
      expensesCtx.setExpenses(expenses);
    }
    getExpense();
  }, []);
  if (isFetching) {
    return <LoadingOverlay />
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallBackText="No Expense registered at Last 7 Days"
    />
  );
};

export default RecentExpenses;
