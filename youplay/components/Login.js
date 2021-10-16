import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

function Login() {
    return (
        <View style={styles.loginContainerStyle}>
            
            <TextInput
                style={styles.passwordTextInputStyle}
                placeholder={'Email'}
            />
            <TextInput
                style={styles.passwordTextInputStyle}
                placeholder={'Password'}
            />

            <Text style={styles.forgotPasswordTextStyle}>
                Forgot Password?
            </Text>

            <TouchableOpacity>
                <View style={styles.loginButtonStyle}>
                    <Text style={styles.loginTextStyle}>Login</Text>
                </View>
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    loginTextStyle: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white'
    },
    loginButtonStyle: {
        backgroundColor: 'orange',
        marginVertical: 10,
        borderRadius: 10,
        paddingVertical: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    loginContainerStyle: {
        marginHorizontal: '5%',
        paddingVertical: '20%'
    },
    passwordTextInputStyle: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginVertical: 15,
        borderRadius: 10,
        opacity: .5,
        fontWeight: '400',
        fontSize: 20,
        borderColor: 'gray',
        borderWidth: 2
    },
    forgotPasswordTextStyle: {
        color: 'blue',
        paddingVertical: -10,
        textAlign: 'right',
        fontSize: 16
    }
})

export default Login
