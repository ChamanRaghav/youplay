import React, { useEffect, useRef, useState } from 'react'
import { Animated, Easing, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import TrackPlayer, {State, useProgress, usePlaybackState, RepeatMode} from 'react-native-track-player';

// import songs from '../mp3Data.js'
const { Off, Queue, Track } = RepeatMode

const songs = [
    {
        id: 'trackId1',
        url: 'https://pagalsong.in/uploads/systemuploads/mp3/Jabardast Dost - Korala Maan/Jabardast Dost - Korala Maan 128 Kbps.mp3',
        title: 'Jabardast Dost',
        artist: 'Korala Maan',
        artwork: 'https://pagalsong.in/uploads//thumbnails/300x300/id3Picture_826985220.jpg'
    },
    {
        id: 'trackId2',
        url: 'https://pagalsong.in/uploads/systemuploads/mp3/Sher - Diljit Dosanjh/Sher - Diljit Dosanjh 128 Kbps.mp3',
        title: 'Sher',
        artist: 'Diljit Dosanjh',
        artwork: 'https://pagalsong.in/uploads//thumbnails/300x300/sher_diljit.jpg'
    },
    {
        id: 'trackId3',
        url: 'https://pagalsong.in/uploads/systemuploads/mp3/Jazbaati Bande - Khasa Aala Ch/Jazbaati Bande - Khasa Aala Chahar 128 Kbps.mp3',
        title: 'Jazbaati Bande',
        artist: 'Khasa Aala Chahar',
        artwork: 'https://pagalsong.in/uploads//thumbnails/300x300/id3Picture_596556753.jpg'
    },
    {
        id: 'trackId4',
        url: 'https://pagalsong.in/uploads/systemuploads/mp3/Churi - Khan Bhaini/Churi - Khan Bhaini 128 Kbps.mp3',
        title: 'Churi',
        artist: 'Khan Bhaini',
        artwork: 'https://pagalsong.in/uploads//thumbnails/300x300/id3Picture_719977274.jpg'
    }
]

const setupMusicPlayer = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(songs);
};

function MusicPlayer() {
    const [currentTrack, setCurrentTrack] = useState({})
    const [repeateMode, setRepeateMode] = useState(Off)
    const [isFavorite, setIsFavorite] = useState(false)
    const progress = useProgress()
    const playbackState = usePlaybackState()
    const heartOpacity = useRef(new Animated.Value(1)).current;
    const heartOutlineOpacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        setupMusicPlayer()
        getCurrentTrackId()
        return () => { }
    }, [])

    // useEffect(() => {
    //     const animateProp = isFavorite ? heartOpacity: heartOutlineOpacity
    //         Animated.timing(animateProp, {
    //             toValue: isFavorite ? 1 : 0.5,
    //             duration: 1000,
    //             easing: Easing.ease,
    //             useNativeDriver: false
    //         }).start()
    // }, [isFavorite])

    const applyAnimation = (prop, toValue, duration) => 
        Animated.timing(prop, {
                toValue,
                duration,
                easing: Easing.ease,
                useNativeDriver: false
        }).start()
    
    const handleFavoriteSelection = (value) => {
        console.log('isFavorite', value)
        applyAnimation(value ? heartOutlineOpacity : heartOpacity, 0, 1000)
        setTimeout(() => {
            setIsFavorite(!value)
            applyAnimation(value ? heartOpacity : heartOutlineOpacity, 1, 1000)
        }, 1000)
    }

    const handleRepeatMode = () => {
        if (repeateMode === Off) {
            TrackPlayer.setRepeatMode(Queue)
            setRepeateMode(Queue)
        } else if (repeateMode === Queue) {
            TrackPlayer.setRepeatMode(Track)
            setRepeateMode(Track)
        } else {
            TrackPlayer.setRepeatMode(Off)
            setRepeateMode(Off)
        }
    }

    const getRepeatIcon = () => {
        if (repeateMode === Off) return 'repeat-off'
        else if (repeateMode === Queue) return 'repeat'
        else return 'repeat-once'
    }

    const getCurrentTrackId = async () => {
        const currentTrackId = await TrackPlayer.getCurrentTrack()
        if (currentTrackId !== null) {
            const currentTrackInfo = await TrackPlayer.getTrack(currentTrackId)
            setCurrentTrack(currentTrackInfo);
        }
        return currentTrackId
    }
    const playNext = async () => {
        await TrackPlayer.skipToNext()
        await getCurrentTrackId()
    }
    const playPrevious = async () => {
        await TrackPlayer.skipToPrevious()
        await getCurrentTrackId()
    }

    const playPauseMusic = async (playbackState) => {
        const currentTrackId = await TrackPlayer.getCurrentTrack()
        console.log('currentTrack', currentTrackId)
        if (currentTrackId !== null) {
            const currentTrackInfo = await TrackPlayer.getTrack(currentTrackId)
            console.log('currentTrackInfo', currentTrackInfo)
            setCurrentTrack(currentTrackInfo)
            if (playbackState === State.Paused) await TrackPlayer.play();
            else await TrackPlayer.pause();
        }
    }

    return (
        <View style={styles.playerContainerStyle}>
            <View style={styles.songImageViewStyle}>
                <Image
                    style={styles.songImageStyle}
                    source={{ uri: currentTrack?.artwork || 'https://picsum.photos/200' }}
                    height={300}
                />
            </View>

            <View style={styles.songNameInfoViewStyle}>
                <Text style={styles.songNameTextStyle}>{currentTrack?.title}</Text>
                <Text style={styles.songInfoTextStyle}>{currentTrack?.artist} </Text>
            </View>

            <View style={styles.sliderAndTimerViewStyle}>
                <Slider
                    style={{ width: '100%', height: 30 }}
                    value={progress.position}
                    minimumValue={0}
                    maximumValue={progress.duration}
                    minimumTrackTintColor="#000"
                    maximumTrackTintColor="lightgrey"
                    tapToSeek={true}
                    onSlidingComplete={async (value) => {
                        await TrackPlayer.seekTo(value)
                    }}
                />
                <View style={styles.playedTimerViewStyle}>
                    <Text style={styles.timerTextStyle}>
                        {new Date(progress.position * 1000).toISOString().substr(14, 5)}
                    </Text>
                    <Text style={styles.timerTextStyle}>
                        {new Date(progress.duration * 1000).toISOString().substr(14, 5)}
                    </Text>
                </View>
            </View>

            <View style={styles.playerControlButtonsStyle}>
                <TouchableOpacity onPress={playPrevious}>
                    <Icon name="caret-left" size={60} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => playPauseMusic(playbackState)}>
                    {playbackState === State.Playing ?
                        (<Icon name="pause-circle" size={70} />) :
                        (<Icon name="play-circle" size={70} />)
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={playNext}>
                    <Icon name="caret-right" size={60} />
                </TouchableOpacity>
            </View>

            <View style={styles.repeatControlStyle}>
                <TouchableOpacity onPress={() => handleFavoriteSelection(isFavorite)}>
                    {!isFavorite ? (
                        <Animated.View style={[styles.heartIconStyle, {opacity: heartOpacity}]}>
                            <MaterialCommunityIcon name='heart' size={40} color='red' />
                        </Animated.View>
                    ) : (
                        <Animated.View style={[styles.heartIconStyle, {opacity: heartOutlineOpacity}]}>
                            <MaterialCommunityIcon name='heart-outline' size={40} color='black' />
                        </Animated.View>
                    )}
                </TouchableOpacity>
                <TouchableOpacity onPress={handleRepeatMode}>
                    <View style={styles.heartIconStyle}>
                        <MaterialCommunityIcon name={getRepeatIcon()} size={40} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    heartIconStyle: {
        // backgroundColor: 'red',
        borderRadius: 35,
        padding: 15,
        borderColor: 'lightgrey',
        borderWidth: 1
    },
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
        paddingTop: '10%'
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
        paddingVertical: 10,
        paddingHorizontal: 30,
        // backgroundColor: 'red',
        alignItems: 'center'
    },
    repeatControlStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
    },
    playerContainerStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingVertical: '10%',
        paddingHorizontal: '5%'
    }
})

export default MusicPlayer
