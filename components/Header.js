import React from 'react'
import { Appearance, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const EXPLORE = 'Explore'
const PLAYER = 'Player'

function Header({activeTab, setActiveTab}) {

    const colorScheme = Appearance.getColorScheme();
    const isDarkMode = colorScheme === 'dark';

    return (
        <View style={styles.headerContainerStyle}>
            <TouchableOpacity onPress={() => setActiveTab(PLAYER)}>
                <View style={[
                    styles.headerItemStyle, 
                    activeTab === EXPLORE && [styles.activeTabStyle, {borderColor : isDarkMode ? '#fff' : '#000' }]
                    ]}>
                    <Text style={styles.headerItemTextStyle}>
                        YouPlay Explore!
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab(PLAYER)}>
                <View style={[
                    styles.headerItemStyle, 
                    activeTab === PLAYER && [styles.activeTabStyle, {borderColor : isDarkMode ? '#fff' : '#000' }]
                    ]}>
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
        paddingVertical: 5,
        height: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    headerItemStyle: {
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    activeTabStyle: {
        borderWidth: 2,
        borderRadius: 10,
    },
    headerItemTextStyle: {
        fontSize: 16,
        fontWeight: '600',
    }
})

export default Header
