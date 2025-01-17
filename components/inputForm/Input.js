import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/Styles";

const Input = ({ label, style, textInputConfig }) => {
  const inputStyle = [styles.input];
  if (textInputConfig && textInputConfig.multiline) {
    inputStyle.push(styles.inputMultiline);
  }
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={inputStyle} {...textInputConfig} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
    fontWeight: "bold",
  },
  input: {
    fontSize: 24,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    borderRadius: 8,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
