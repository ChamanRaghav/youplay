import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';

function MusicPlayer() {
    return (
        <View style={styles.playerContainerStyle}>
            <View style={styles.songImageViewStyle}>
                <Image
                    style={styles.songImageStyle}
                    source={{ uri: 'https://picsum.photos/200' }}
                    height={300}
                />
            </View>

            <View style={styles.songNameInfoViewStyle}>
                <Text style={styles.songNameTextStyle}>Song Name</Text>
                <Text style={styles.songInfoTextStyle}>Song Info, Singer name, etc</Text>
            </View>

            <View style={styles.sliderAndTimerViewStyle}>
                <Slider
                    style={{width: '100%', height: 30}}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#000"
                    maximumTrackTintColor="lightgrey"
                    tapToSeek={true}
                />
                <View style={styles.playedTimerViewStyle}>
                    <Text style={styles.timerTextStyle}>0:00</Text>
                    <Text style={styles.timerTextStyle}>5:00</Text>
                </View>
            </View>

            <View style={styles.playerControlButtonsStyle}>
                {/* <Text>Playback Controls</Text> */}
                <Icon name="rocket" size={50}/>
                {/* <Icon name="play-circle" size={30} color="#900" />
                <Icon name="pause-circle" size={30} color="#900" /> */}
                {/* <Icon name="caret-right" size={30} color="#900" /> */}
            </View>

            <View style={styles.repeatControlStyle}>
                <Text>Repeat, Loop etc</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    sliderAndTimerViewStyle: {
        paddingVertical: '5%'
    },
    timerTextStyle: {
        color: 'grey'
    },
    playedTimerViewStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    songImageStyle: {
        borderRadius: 7
    },
    songImageViewStyle: {
        paddingVertical: 15
    },
    songNameInfoViewStyle: {
        paddingVertical: 10,
        paddingTop: '20%'
    },
    songNameTextStyle: {
        fontSize: 32,
        fontWeight: '400',
    },
    songInfoTextStyle: {
        fontSize: 20,
        fontWeight: '300',
        color: 'grey'
    },
    playerControlButtonsStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    repeatControlStyle: {},
    playerContainerStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingVertical: '10%',
        paddingHorizontal: '5%'
    }
})

export default MusicPlayer
