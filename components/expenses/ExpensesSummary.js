import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/Styles";

const ExpensesSummary = ({expenses, period}) => {
    const expenseSum = expenses.reduce((sum, expense) =>{
        return sum + expense.amount
    }, 0)
    
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{period}</Text>
      <Text style={styles.summary}>${expenseSum.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: GlobalStyles.colors.primary50
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400
  },
  summary: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary500
  }
});