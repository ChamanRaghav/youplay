import React, {useEffect, useState} from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Appearance } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { songs } from './songs'
import TrackPlayer, { usePlaybackState, State } from 'react-native-track-player';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

function SongsList({currentTrack, setCurrentTrack }) {
    const [filteredSongs, setFilteredSongs] = useState([songs])
    const [bufferingIcon, setBufferingIcon] = useState('loading1')
    const playbackState = usePlaybackState()

    useEffect(() => {
        setFilteredSongs(songs)
    }, [songs])

      
  const colorScheme = Appearance.getColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const iconColor = isDarkMode ? '#fff' : '#000'

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

    // TODO: Can look into it later.
    // useEffect(() => {
    //     if(playbackState === State.Buffering)
    //     setInterval(() => {
    //         setBufferingIcon(bufferingIcon === 'loading1' ? 'loading2': 'loading1')
    //     }, 10);
    // }, [playbackState])
    

    const renderIconForSongState = (playerState) => {
        console.log('playerState', playerState)
        switch(playerState) {
            case State.Playing:
                return <AntDesign name='playcircleo' size={30} color={iconColor} />
            case State.Paused:
                return <AntDesign name='pausecircleo' size={30} color={iconColor} />
            case State.Stopped:
                return <AntDesign name='pausecircleo' size={30} color={iconColor} />
            case State.Buffering:
                return <AntDesign name={bufferingIcon} size={30} color={iconColor} />
            default:
                return
        }
    }

    return (
        <View style={styles.songsContainerStyle}>
            <View style={[styles.allSongsHeaderView, {backgroundColor: isDarkMode ? 'grey': 'white'}]}>
                <Text style={styles.allSongsTextStyle}>Music</Text>
                <FontAwesomeIcon name="search" size={30} color={iconColor}/>
            </View>

            <View style={styles.songsListViewStyle}>
                {filteredSongs.map((song, index) => (
                    <TouchableOpacity  key={index} onPress={() => playSong(index)}>
                    <View style={styles.songsItemViewStyle}>
                        <View>
                            <Image source={{uri: song.artwork || 'https://picsum.photos/200'}} height={200} style={styles.songImageStyle} />
                        </View>
                        <View style={styles.songNameArtistViewStyle}>
                                <Text style={styles.songNameTextStyle}>{song.title || 'Song Name N/A'}</Text>
                                <Text style={styles.songArtistTextStyle}>{song.artist || 'Song Artist N/A'}</Text>
                        </View>
                        <View style={styles.playIconViewStyle}>
                            <View style={styles.playIconView}>
                                {currentTrack?.id === song?.id && renderIconForSongState(playbackState)}    
                            </View>
                        </View>
                    </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    songsListViewStyle: {},
    allSongsHeaderView: {
        padding: 7,
        // backgroundColor: 'grey',
        marginVertical: 7,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    allSongsTextStyle: {
        fontSize: 30,
        fontWeight: '600',
    },
    songsContainerStyle: {},
    playIconView: {
    },
    playIconViewStyle: {
        position: 'absolute',
        right: 5,
        borderRadius: 20
    },
    songNameTextStyle: {
        fontSize: 20,
        fontWeight: '400',
        // color: '#000'
    },
    songArtistTextStyle: {
        fontSize: 16,
        fontWeight: '300',
        // color: 'grey'
    },
    songNameArtistViewStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 7,
    },
    songsItemViewStyle: {
        paddingHorizontal: 5,
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 1,
        alignItems: 'center',
        // backgroundColor: '#f7f7f2',
        borderRadius: 5,
        marginVertical: 1,
        marginHorizontal: 5,
    },
    songImageStyle: {
        height: 50,
        width: 50,
        borderRadius: 5
    }
})

export default SongsList
