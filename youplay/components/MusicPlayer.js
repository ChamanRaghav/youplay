import React, { useEffect, useRef, useState } from 'react'
import { Animated, ndler, Easing, Image, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native'
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import TrackPlayer, {State, useProgress, usePlaybackState, RepeatMode} from 'react-native-track-player';

const { Off, Queue, Track } = RepeatMode
const SONGS_LIST = 'SongsList'

function MusicPlayer ({setActiveTab, currentTrack, setCurrentTrack}) {
    const [repeateMode, setRepeateMode] = useState(Off)
    const [isFavorite, setIsFavorite] = useState(false)
    const progress = useProgress()
    const playbackState = usePlaybackState()
    const heartOpacity = useRef(new Animated.Value(1)).current;
    const heartOutlineOpacity = useRef(new Animated.Value(1)).current;
    const songImageOpacity = useRef(new Animated.Value(1)).current;

    // useEffect(() => {
    //     getCurrentTrackId()
    //     // return () => {}
    // }, [])

    const applyAnimation = (prop, toValue, duration) => 
        Animated.timing(prop, {
                toValue,
                duration,
                easing: Easing.ease,
                useNativeDriver: false
        }).start()
    
    const handleFavoriteSelection = (value) => {
        applyAnimation(value ? heartOutlineOpacity : heartOpacity, 0, 500)
        setTimeout(() => {
            setIsFavorite(!value)
            applyAnimation(value ? heartOpacity : heartOutlineOpacity, 1, 500)
        }, 500)
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
        applyAnimation(songImageOpacity, 0, 500)
        await TrackPlayer.skipToNext()
        setTimeout(async () => {
            applyAnimation(songImageOpacity, 1, 500)
            await getCurrentTrackId()
        }, 500)
    }
    const playPrevious = async () => {
        applyAnimation(songImageOpacity, 0, 500)
        await TrackPlayer.skipToPrevious()
        setTimeout(async () => {
            applyAnimation(songImageOpacity, 1, 500)
            await getCurrentTrackId()
        }, 500)
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
            <Animated.View style={[styles.songImageViewStyle, { opacity: songImageOpacity }]}>
                <Image
                    style={styles.songImageStyle}
                    source={{ uri: currentTrack?.artwork || 'https://picsum.photos/200' }}
                    height={300}
                />
            </Animated.View>

            <View style={styles.songsNameMoreViewStyle}>
                <View style={styles.songNameInfoViewStyle}>
                    <Text style={styles.songNameTextStyle}>{currentTrack?.title}</Text>
                    <Text style={styles.songInfoTextStyle}>{currentTrack?.artist} </Text>
                    
                </View>
                <TouchableOpacity onPress={() => setActiveTab(SONGS_LIST)}>
                    <View style={styles.moreVertIconStyle}>
                        <MaterialIcons name="more-vert" size={40} color='black' />
                    </View>
                </TouchableOpacity>
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
                    onSlidingComplete={async (value) => await TrackPlayer.seekTo(value)}
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
                <TouchableWithoutFeedback onPress={playPrevious}>
                    <View style={styles.prevNextIconViewStyle}>
                        <Icon name="caret-left" size={70} color='black'/>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => playPauseMusic(playbackState)}>
                    {playbackState === State.Playing ?
                        (<Icon name="pause-circle" size={80} color='black'/>) :
                        (<Icon name="play-circle" size={80} color='black'/>)
                    }
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={playNext}>
                    <View style={styles.prevNextIconViewStyle}>
                        <Icon name="caret-right" size={70} color='black'/>
                    </View>
                </TouchableWithoutFeedback>
            </View>

            <View style={styles.repeatControlStyle}>
                <TouchableWithoutFeedback onPress={() => handleFavoriteSelection(isFavorite)}>
                    {!isFavorite ? (
                        <Animated.View style={[styles.heartIconStyle, {opacity: heartOpacity}]}>
                            <MaterialCommunityIcon name='heart' size={40} color='red' />
                        </Animated.View>
                    ) : (
                        <Animated.View style={[styles.heartIconStyle, {opacity: heartOutlineOpacity}]}>
                            <MaterialCommunityIcon name='heart-outline' size={40} color='black' />
                        </Animated.View>
                    )}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={handleRepeatMode}>
                    <View style={styles.heartIconStyle}>
                        <MaterialCommunityIcon name={getRepeatIcon()} size={40} color='black'/>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setActiveTab(SONGS_LIST)}>
                    <View style={styles.heartIconStyle}>
                        <MaterialCommunityIcon name={'playlist-music'} size={40} color='black'/>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    prevNextIconViewStyle: {
        borderRadius: 15,
        padding: 10,
        // borderColor: '#e1eafa',
        // borderWidth: 2,
        backgroundColor: '#f2f5fa'
    },
    songsNameMoreViewStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    moreVertIconStyle: {
        borderRadius: 35,
        padding: 15,
    },
    heartIconStyle: {
        borderRadius: 35,
        padding: 15,
        borderColor: 'lightgrey',
        borderWidth: 1
    },
    sliderAndTimerViewStyle: {
        paddingVertical: '5%',
        // margin: 0
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
    },
    songNameTextStyle: {
        fontSize: 32,
        fontWeight: '400',
        color: 'black'
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
        paddingVertical: 20,
    },
    playerContainerStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        // paddingVertical: '10%',
        paddingHorizontal: '5%'
    }
})

export default MusicPlayer
