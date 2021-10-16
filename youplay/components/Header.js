import React, {useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const EXPLORE = 'Explore'
const PLAYER = 'player'

function Header({activeTab, setActiveTab}) {
    return (
        <View style={styles.headerContainerStyle}>
            <TouchableOpacity onPress={() => setActiveTab(EXPLORE)}>
                <View style={[styles.headerItemStyle, activeTab === EXPLORE && styles.activeTabStyle]}>
                    <Text style={styles.headerItemTextStyle}>
                        YouPlay Explore!
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab(PLAYER)}>
                <View style={[styles.headerItemStyle, activeTab === PLAYER && styles.activeTabStyle]}>
                    <Text style={styles.headerItemTextStyle}>
                        Local Player
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainerStyle: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 5,
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    headerItemStyle: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    activeTabStyle: {
        borderWidth: 2,
        borderColor: 'orange',
    },
    headerItemTextStyle: {
        fontSize: 16,
        fontWeight: '600',
    }
})

export default Header
