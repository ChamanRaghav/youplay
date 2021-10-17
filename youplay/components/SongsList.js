import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { songs } from './songs'
import TrackPlayer from 'react-native-track-player';

const PLAYER = 'Player'

function SongsList({ setActiveTab }) {
    
    const playSong = async (index) => {
        await TrackPlayer.skip(index)
        setActiveTab(PLAYER)
    }

    return (
        <View style={styles.songsContainerStyle}>
            <View style={styles.allSongsHeaderView}>
                <Text style={styles.allSongsTextStyle}>Music</Text>
            </View>

            <View style={styles.songsListViewStyle}>
                {songs.map((song, index) => (
                    <View style={styles.songsItemViewStyle} key={song.id}>
                        <View>
                            <Image source={{uri: song.artwork || 'https://picsum.photos/200'}} height={200} style={styles.songImageStyle} />
                        </View>
                        <View style={styles.songNameArtistViewStyle}>
                                <Text style={styles.songNameTextStyle}>{song.title}</Text>
                                <Text style={styles.songArtistTextStyle}>{song.artist}</Text>
                        </View>
                        <View style={styles.playIconViewStyle}>
                            <View style={styles.playIconView}>
                                <TouchableOpacity onPress={() => playSong(index)}>
                                        <Icon name="play" size={40} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    songsListViewStyle: {},
    allSongsHeaderView: {
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#edf5ff',
        marginVertical: 10
    },
    allSongsTextStyle: {
        fontSize: 30,
        fontWeight: '600'
    },
    songsContainerStyle: {},
    playIconView: {
        borderRadius: 40,
        backgroundColor: '#f0f4f7',
        padding: 10
    },
    playIconViewStyle: {
        position: 'absolute',
        right: 15,
        borderRadius: 20
    },
    songNameTextStyle: {
        fontSize: 24,
        fontWeight: '400'
    },
    songArtistTextStyle: {
        fontSize: 20,
        fontWeight: '300',
        color: 'grey'
    },
    songNameArtistViewStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    songsItemViewStyle: {
        paddingHorizontal: 15,
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: '#f7f7f2',
        borderRadius: 15,
        marginVertical: 2,
        marginHorizontal: 10,
        // paddingHorizontal: 10,
    },
    songImageStyle: {
        height: 75,
        width: 75,
        borderRadius: 10
    }
})

export default SongsList
