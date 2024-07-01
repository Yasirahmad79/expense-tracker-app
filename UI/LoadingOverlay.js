import { ActivityIndicator, StyleSheet, View, Text } from "react-native";
import { GlobalStyles } from "../constants/Styles";
function LoadingOverlay() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={34} color={"white"} />
      <Text style={styles.text}>Sync Data</Text>
    </View>
  );
}
export default LoadingOverlay;

const styles =StyleSheet.create({
    loadingContainer: {
        backgroundColor: GlobalStyles.colors.primary800,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: "white",
        marginTop: 8
    }
})