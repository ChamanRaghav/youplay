import React, {useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
                <View style={styles.buttonViewStyle}>
                    <TouchableOpacity
                     onPress={() => setActiveTab(LOGIN)}
                    >
                        <Text style={styles.buttonTextStyle}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonViewStyle}>
                    <TouchableOpacity
                     onPress={() => setActiveTab(SIGNUP)}
                    >
                        <Text style={styles.buttonTextStyle}>Sign Up</Text>
                    </TouchableOpacity>
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
        // backgroundColor: 'red', // Used to apply style :-) 
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: '20%',
    },
    buttonTextStyle: {
        fontSize: 22,
        fontWeight: '600',
    },
    buttonViewStyle: {
        borderBottomColor: 'orange',
        borderBottomWidth: 5,
        paddingBottom: 10,
        paddingHorizontal: 20
    }
  });

export default Register
