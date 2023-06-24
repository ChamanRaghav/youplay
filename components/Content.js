import React, {useState, useEffect} from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import Header from './Header'
import MusicPlayer from './MusicPlayer'
import Register from './Register'
import SongsList from './SongsList'
import { songs } from './songs'
import TrackPlayer, { Capability, RatingType } from 'react-native-track-player';
import { useBackHandler } from '@react-native-community/hooks'
import LocalMusicFiles from './LocalMusicFiles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const EXPLORE = 'Explore'
const PLAYER = 'Player'
const SONGS_LIST = 'SongsList'
const LOCAL_MUSIC_FILES = 'LocalMusicFiles'

const { Play, Pause, SkipToNext, SkipToPrevious, Stop } = Capability
const capabilities = [
    Play,
    Pause,
    SkipToNext,
    SkipToPrevious,
    Stop,
]

function Content() {
    const [activeTab, setActiveTab] = useState(PLAYER)
    const [currentTrack, setCurrentTrack] = useState({})

    useBackHandler(() => {
        if (activeTab !== PLAYER) {
            setActiveTab(PLAYER)
            return true
        }
        return false
      })

    const setupMusicPlayer = async () => {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
            // Media controls capabilities
            capabilities,
            // Capabilities that will show up when the notification is in the compact form on Android
            compactCapabilities: capabilities,
            notificationCapabilities: capabilities,
            ratingType: RatingType.FiveStars
        });
        await TrackPlayer.add(songs);
        await TrackPlayer.play();
        setTimeout(async () => await TrackPlayer.pause(), 10)
        const currentTrackId = await TrackPlayer.getCurrentTrack()
        const currentTrackInfo =  await TrackPlayer.getTrack(currentTrackId)
        setCurrentTrack(currentTrackInfo)
    }

    useEffect(() => {
        setupMusicPlayer()
        return () => {}
    }, [])

    const RenderScreens = () => {
        switch (activeTab) {
            case EXPLORE:
                return <Register />;
            case PLAYER:
                return <MusicPlayer 
                        setActiveTab={setActiveTab} 
                        currentTrack={currentTrack}
                        setCurrentTrack={setCurrentTrack}
                       />;
            case SONGS_LIST:
                // return <LocalSongs />
                return <SongsList 
                            setActiveTab={setActiveTab} 
                            currentTrack={currentTrack}
                            setCurrentTrack={setCurrentTrack}
                        />
            case LOCAL_MUSIC_FILES:
                return <LocalMusicFiles 
                    currentTrack={currentTrack}
                    setCurrentTrack={setCurrentTrack}
                />
            default:
                return <MusicPlayer 
                        setActiveTab={setActiveTab} 
                        currentTrack={currentTrack}
                        setCurrentTrack={setCurrentTrack}
                       />;
        }
    }

    return (
        <View style={[
            styles.containerStyle,
            {
                minHeight: Dimensions.get('screen').height -  73,
            }
        ]}>
            <View style={styles.headerContainerStyle}>
                {activeTab !== SONGS_LIST && (<Header
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />)}
            </View>
            <View style={styles.contentContainerStyle}>
                {RenderScreens()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        // marginBottom: 10,
        flex: 1,
        flexDirection: 'column',
    },
    headerContainerStyle: {
        flex: 0.5,
        // backgroundColor: 'green'
    },
    contentContainerStyle: {
        flex: 100,
        // backgroundColor: 'grey'
    }
})

export default Content
