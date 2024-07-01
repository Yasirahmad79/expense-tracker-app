import {View, Text} from 'react-native'
import { Pressable, StyleSheet } from 'react-native'
import { GlobalStyles } from '../constants/Styles'

const Button = ({children, onPress, mode, style}) => {
  return (
    <View style={style}>
        <Pressable onPress={onPress} style={({pressed})=> pressed && styles.pressed}>
            <View style={[styles.button, mode === 'flat' && styles.flat]}>
                <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>{children}</Text>
            </View>
        </Pressable>
    </View>
  )
}

export default Button;

const styles = StyleSheet.create({
    button: {
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary500
    },
    flat:{
        backgroundColor: 'transparent'
    }, 
    flatText: {
        color: GlobalStyles.colors.primary200
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    pressed: {
        opacity: 0.75,
        backgroundColor: GlobalStyles.colors.primary100
    }
})