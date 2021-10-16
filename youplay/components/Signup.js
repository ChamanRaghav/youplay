import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

function Signup() {
    return (
        <View style={styles.signupContainerStyle}>
            <TextInput
                style={styles.emailTextInputStyle}
                placeholder={'Email'}
            />

            <Text style={styles.birthdayTextStyle}>
                Birthday
            </Text>
            <Text style={styles.birthdayPrivateTextStyle}>
                Your birthday is private!!!
            </Text>
            <TextInput
                style={styles.passwordTextInputStyle}
                placeholder={'Enter you Birthday'}
            />

            <TextInput
                style={styles.passwordTextInputStyle}
                placeholder={'Password'}
            />

            <Text style={styles.signupTermsAndPolicyTextStyle}>
                By Signing up, you agree to our
                <Text style={styles.termsAndPolicyTextStyle}> Terms & Conditiond </Text>
                and acknowledge that you have read our
                <Text style={styles.termsAndPolicyTextStyle}> Privacy Policy</Text>.
            </Text>

            <TouchableOpacity>
                <View style={styles.signupButtonStyle}>
                    <Text style={styles.signupTextStyle}>Sign Up</Text>
                </View>
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    termsAndPolicyTextStyle: {
        color: 'orange',
        fontSize: 14,
        fontWeight: '600',
    },
    signupTextStyle: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white'
    },
    signupButtonStyle: {
        backgroundColor: 'orange',
        marginVertical: 25,
        borderRadius: 10,
        paddingVertical: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    signupContainerStyle: {
        marginHorizontal: '5%',
        paddingVertical: '20%'
    },
    emailTextInputStyle: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        opacity: .5,
        fontWeight: '400',
        fontSize: 20,
        borderColor: 'gray',
        borderWidth: 2
    },
    birthdayTextStyle: {
        fontWeight: '500',
        marginTop: 20,
        fontSize: 20
    },
    birthdayPrivateTextStyle: {
        fontWeight: '300',
        fontSize: 14,
        color: 'grey'
    },
    passwordTextInputStyle: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginVertical: 15,
        // backgroundColor: '#f5f7ff',
        borderRadius: 10,
        opacity: .5,
        fontWeight: '400',
        fontSize: 20,
        borderColor: 'gray',
        borderWidth: 2
    },
    signupTermsAndPolicyTextStyle: {
        color: 'grey',
        fontStyle: 'normal',
        paddingVertical: 10
    }
})

export default Signup
