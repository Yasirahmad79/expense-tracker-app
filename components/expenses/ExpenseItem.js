import { Pressable, StyleSheet, Text, View } from "react-native"
import { GlobalStyles } from "../../constants/Styles";
import { getFormData } from "../../utility/date";
import { useNavigation } from "@react-navigation/native";


const ExpenseItem = ({description, date, amount, id}) => {
    const navigation = useNavigation()
    const expenseItemHandler = ()=>{
        navigation.navigate('ManageExpenses', {
            expenseId: id
        })
    }
    return <Pressable onPress={expenseItemHandler} style={({pressed}) => pressed ? styles.pressed : null}>
        <View style={styles.expenseItem}>
            <View>
                <Text style={[styles.description, styles.textBase]}>{description}</Text>
                <Text style={styles.textBase}>{getFormData(date)}</Text>
            </View>
            <View style={styles.amountContainer}>
                <Text style={styles.amount}>{amount.toFixed(2)}</Text>
            </View>
        </View>
    </Pressable>
}
export default ExpenseItem;

const styles = StyleSheet.create({
    expenseItem: {
        padding: 12,
        justifyContent: 'space-between',
        backgroundColor: GlobalStyles.colors.primary500,
        marginVertical: 8,
        flexDirection: 'row',
        elevation: 4,
        borderRadius: 8
    },
    textBase: {
        color: GlobalStyles.colors.primary50
    },
    description: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    }, 
    amountContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 12,
        paddingVertical: 4,
        minWidth: 80,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pressed: {
        opacity: 0.75
    }
});