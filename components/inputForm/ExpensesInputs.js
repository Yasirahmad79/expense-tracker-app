import React, { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import Input from "./Input";
import Button from "../../UI/Button";
import { getFormData } from "../../utility/date";

const ExpensesInputs = ({ onSubmit, onCancel, condition, defaultValue }) => {
  const [inputValue, setInputValue] = useState({
    amount: defaultValue ? defaultValue.amount.toString() : "",
    date: defaultValue ? getFormData(defaultValue.date) : "",
    description: defaultValue ? defaultValue.description : "",
  });
  const [inputErrors, setInputErrors] = useState({
    amount: false,
    date: false,
    description: false,
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputValue((currInputValue) => ({
      ...currInputValue,
      [inputIdentifier]: enteredValue,
    }));

    // Clear previous error status on input change
    setInputErrors((prevInputErrors) => ({
      ...prevInputErrors,
      [inputIdentifier]: false,
    }));
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputValue.amount,
      date: new Date(inputValue.date),
      description: inputValue.description,
    };

    // Validation checks
    const validAmount = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const validDate =
      /^\d{4}-\d{2}-\d{2}$/.test(inputValue.date) &&
      expenseData.date.toString() !== "Invalid Date";
    const validDescription = expenseData.description.trim().length > 0;

    // Set error status if validation fails
    setInputErrors({
      amount: !validAmount,
      date: !validDate,
      description: !validDescription,
    });

    // Check if all inputs are valid
    if (validAmount && validDate && validDescription) {
      onSubmit(expenseData);
    } else {
      Alert.alert("Please check all inputs. Some inputs are incorrect.");
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.addtextTitle}>Fill Form</Text>
      <View style={styles.inputRow}>
        <Input
          style={[styles.rowInput, inputErrors.amount && styles.inputError]}
          label="Amount"
          textInputConfig={{
            keyboardType: "numeric",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputValue.amount,
          }}
        />
        {inputErrors.amount && (
          <Text style={styles.errorText}>Please enter a valid amount</Text>
        )}
      </View>
      <View style={styles.inputRow}>
        <Input
          style={[styles.rowInput, inputErrors.date && styles.inputError]}
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputValue.date,
          }}
        />
        {inputErrors.date && (
          <Text style={styles.errorText}>
            Please enter a date in YYYY-MM-DD format
          </Text>
        )}
      </View>
      <Input
        label="Description"
        style={[
          styles.inputMultiline,
          inputErrors.description && styles.inputError,
        ]}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputValue.description,
        }}
      />
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} mode="flat" onPress={submitHandler}>
          {condition}
        </Button>
      </View>
    </View>
  );
};

export default ExpensesInputs;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  addtextTitle: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "white",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  inputError: {
    backgroundColor: "pink", // Change background color on error
  },
});
