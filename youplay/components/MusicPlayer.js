import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeathersIcon from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer, {State, useProgress, usePlaybackState} from 'react-native-track-player';

// import songs from '../mp3Data.js'

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
    // Set up the player
    await TrackPlayer.setupPlayer();

    // Add a track to the queue
    await TrackPlayer.add(songs);
};

function MusicPlayer() {
    const [currentTrack, setCurrentTrack] = useState({})
    const progress = useProgress()
    const playbackState = usePlaybackState()

    useEffect(() => {
        setupMusicPlayer()
        return () => { }
    }, [])

    // const currentTrack = async () => await TrackPlayer.getCurrentTrack()
    // console.log('songs', currentTrack())

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
                    <Icon name="caret-left" size={50} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => playPauseMusic(playbackState)}>
                    {playbackState === State.Playing ?
                        (<Icon name="pause-circle" size={70} />) :
                        (<Icon name="play-circle" size={70} />)
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={playNext}>
                    <Icon name="caret-right" size={50} />
                </TouchableOpacity>
            </View>

            <View style={styles.repeatControlStyle}>
                <FeathersIcon name="repeat" size={35} />
                <FeathersIcon name="repeat-one" size={35} />
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
        paddingHorizontal: 20
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
