import React, {useState, useEffect} from 'react'
import { View } from 'react-native'
import Header from './Header'
import MusicPlayer from './MusicPlayer'
import Register from './Register'
import SongsList from './SongsList'
import { songs } from './songs'
import TrackPlayer from 'react-native-track-player';
import { useBackHandler } from '@react-native-community/hooks'

const EXPLORE = 'Explore'
const PLAYER = 'Player'
const SONGS_LIST = 'SongsList'

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
                return <SongsList 
                            setActiveTab={setActiveTab} 
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
        <View>
            {activeTab !== SONGS_LIST && (<Header
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />)}
            {RenderScreens()}
        </View>
    )
}

export default Content
