import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import ManageExpenses from "./screens/ManageExpenses";
import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import IconButton from "./UI/IconButton";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "./constants/Styles";
import ExpensesContextProvider from "./store/contextApi/expenses-context";
// import { Provider } from "react-redux";
// import { store } from "./store/redux/redux-store";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const ExpenseOverview = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        headerTitleAlign: "center",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            color={tintColor}
            size={24}
            onPress={() => {
              navigation.navigate("ManageExpenses");
            }}
          />
        ),
      })}
    >
      <BottomTab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
          title: "All Expenses",
          tabBarLabel: "All Expenses",
        }}
      />
      <BottomTab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
          title: "Recent Expenses",
          tabBarLabel: "Recent",
        }}
      />
    </BottomTab.Navigator>
  );
};

const App = () => {
  return (
    <>
      <StatusBar style="light" />
      {/* <Provider store={store}> */}
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: "white",
              headerTitleAlign: "center",
            }}
          >
            <Stack.Screen
              name="ExpenseOverview"
              component={ExpenseOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="ManageExpenses" component={ManageExpenses} />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
      {/* </Provider> */}
    </>
  );
};

export default App;
