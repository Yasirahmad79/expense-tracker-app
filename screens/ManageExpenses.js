import React, { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../UI/IconButton";
import { GlobalStyles } from "../constants/Styles";
import { ExpensesContext } from "../store/contextApi/expenses-context";
import ExpensesInputs from "../components/inputForm/ExpensesInputs";
import { deleteExpense, storeExpense, updateExpense } from "../utility/http";
import LoadingOverlay from "../UI/LoadingOverlay";

const ManageExpenses = ({ route, navigation }) => {
  const { deleteExpenses, addExpenses, updateExpenses, expenses } =
    useContext(ExpensesContext);
    const [isSubmited, setIsSubmited] = useState(false)
  const editedExpenseId = route.params?.expenseId;
  const isEdited = !!editedExpenseId;
  const selectedExpense = expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdited ? "Edit Expense" : "Add Expense",
    });
  }, [isEdited, navigation]);

  const deleteExpenseHandler = async() => {
    try {
      setIsSubmited(true)
      deleteExpenses(editedExpenseId);
    await deleteExpense(editedExpenseId)
    setIsSubmited(false)
    navigation.goBack();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async(expenseData) => {
    try {
      if (isEdited) {
        setIsSubmited(true)
        updateExpenses(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData)
        setIsSubmited(false)
      } else {
        setIsSubmited(true)
        const id = await storeExpense(expenseData)
        setIsSubmited(false)
        addExpenses({...expenseData, id: id});
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error confirm expense:', error);
    }
    
  };
  if (isSubmited) {
    return <LoadingOverlay />
  }
  return (
    <View style={styles.container}>
      <ExpensesInputs
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        condition={isEdited ? "Update" : "Add"}
        defaultValue={selectedExpense}
      />
      {isEdited && (
        <View style={styles.buttonContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttonContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
