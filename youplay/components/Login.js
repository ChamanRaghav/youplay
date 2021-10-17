import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDimensions } from '@react-native-community/hooks'

function Login() {
    // const {width, height} = useDimensions().screen

    return (
        <View style={styles.loginContainerStyle}>
            
            <TextInput
                style={styles.passwordTextInputStyle}
                placeholder={'Email'}
                keyboardType='email-address'
                autoCapitalize='none'
            />
            <TextInput
                style={styles.passwordTextInputStyle}
                placeholder={'Password'}
                // keyboardType='password'
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
        justifyContent: 'space-around',
        // position: 'absolute',
        // bottom: 0
    },
    loginContainerStyle: {
        marginHorizontal: '5%',
        marginTop: '5%',
        // height: height
        color: '#000'
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
