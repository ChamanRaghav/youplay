import React, {useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import Login from './Login'
import Signup from './Signup'
// import styles from '../styles/register'

const LOGIN = 'Login'
const SIGNUP = 'Sign Up'

function Register() {
    const [activeTab, setActiveTab] = useState(LOGIN)

    return (
        <>
            <View style={styles.registerControlButtonContainer}>
                <View style={[styles.buttonViewStyle, activeTab === LOGIN && styles.activeTabStyle]}>
                    <TouchableWithoutFeedback
                     onPress={() => setActiveTab(LOGIN)}
                    >
                        <Text style={styles.buttonTextStyle}>Login</Text>
                    </TouchableWithoutFeedback>
                </View>
                <View style={[styles.buttonViewStyle, activeTab === SIGNUP && styles.activeTabStyle]}>
                    <TouchableWithoutFeedback
                     onPress={() => setActiveTab(SIGNUP)}
                    >
                        <Text style={styles.buttonTextStyle}>Sign Up</Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <View>
                {activeTab === LOGIN ? (<Login />) : (<Signup/>)}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    registerControlButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: '10%',
    },
    buttonTextStyle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#000'
    },
    buttonViewStyle: {
        paddingBottom: 10,
        paddingHorizontal: 20
    },
    activeTabStyle: {
        borderBottomColor: 'orange',
        borderBottomWidth: 5,
    }
  });

export default Register
