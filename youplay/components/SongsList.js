import React, {useEffect, useState} from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { songs } from './songs'
import TrackPlayer, { usePlaybackState, State } from 'react-native-track-player';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'

function SongsList({currentTrack, setCurrentTrack }) {
    const [filteredSongs, setFilteredSongs] = useState([songs])
    const playbackState = usePlaybackState()

    useEffect(() => {
        setFilteredSongs(songs)
    }, [songs])

    const playSong = async (index) => {
        if(songs[index]?.id === currentTrack.id) {
            if(playbackState === State.Playing) return await TrackPlayer.pause()
            else return await TrackPlayer.play()
        } else {
            await TrackPlayer.skip(index)
            await TrackPlayer.play()
            setCurrentTrack(await TrackPlayer.getTrack(index))
        }
    }

    return (
        <View style={styles.songsContainerStyle}>
            <View style={styles.allSongsHeaderView}>
                <Text style={styles.allSongsTextStyle}>Music</Text>
                <FontAwesomeIcon name="search" size={40} color='black'/>
            </View>

            <View style={styles.songsListViewStyle}>
                {filteredSongs.map((song, index) => (
                    <View style={styles.songsItemViewStyle} key={index}>
                        <View>
                            <Image source={{uri: song.artwork || 'https://picsum.photos/200'}} height={200} style={styles.songImageStyle} />
                        </View>
                        <View style={styles.songNameArtistViewStyle}>
                                <Text style={styles.songNameTextStyle}>{song.title || 'Song Name N/A'}</Text>
                                <Text style={styles.songArtistTextStyle}>{song.artist || 'Song Artist N/A'}</Text>
                        </View>
                        <View style={styles.playIconViewStyle}>
                            <View style={styles.playIconView}>
                                <TouchableOpacity onPress={() => playSong(index)}>
                                    { (currentTrack?.id === song?.id && playbackState === State.Playing) ? 
                                        (<SimpleLineIcon name='equalizer' size={40} color='black'/>) :
                                        (<Icon name="play" size={40} color='black'/>)
                                    }    
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
        backgroundColor: '#edf5ff',
        marginVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    allSongsTextStyle: {
        fontSize: 30,
        fontWeight: '600',
        color: '#000'
    },
    songsContainerStyle: {},
    playIconView: {
        borderRadius: 10,
        backgroundColor:  'white', // '#f0f4f7',
        padding: 5
    },
    playIconViewStyle: {
        position: 'absolute',
        right: 5,
        borderRadius: 20
    },
    songNameTextStyle: {
        fontSize: 24,
        fontWeight: '400',
        color: '#000'
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
