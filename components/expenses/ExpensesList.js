import { FlatList, StyleSheet } from "react-native";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = ({expenses}) => {
    function renderExpenseItem(itemData) {
        return <ExpenseItem {...itemData.item} />
    }
  return (
    <FlatList 
    data={expenses}
    renderItem={renderExpenseItem}
    keyExtractor={item=> item.id}
    />
  );
};

export default ExpensesList;
const styles = StyleSheet.create({
  detail: {
    marginVertical: 5,
    fontSize: 14,
    color: 'white'
  }
});