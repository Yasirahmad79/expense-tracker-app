import { View, Text, StyleSheet } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/Styles";


const ExpensesOutput = ({expenses, expensesPeriod, fallBackText}) => {
  let content = <Text style={styles.fallBackInfo}>{fallBackText}</Text>

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} period={expensesPeriod} />
      {expenses && expenses.length > 0 ? <ExpensesList expenses={expenses} /> : content}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700
  },
  fallBackInfo: {
    marginTop: 50,
    color: 'white',
    textAlign: 'center',
    fontSize: 32
  }
});
