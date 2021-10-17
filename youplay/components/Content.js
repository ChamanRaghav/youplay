import React, {useState} from 'react'
import { Text, View } from 'react-native'
import Header from './Header'
import MusicPlayer from './MusicPlayer'
import Register from './Register'
import SongsList from './SongsList'

const EXPLORE = 'Explore'
const PLAYER = 'Player'
const SONGS_LIST = 'SongsList'

function Content() {
    const [activeTab, setActiveTab] = useState(PLAYER)

    const RenderScreens = () => {
        switch (activeTab) {
            case EXPLORE:
                return <Register />;
            case PLAYER:
                return <MusicPlayer setActiveTab={setActiveTab}/>;
            case SONGS_LIST:
                return <SongsList setActiveTab={setActiveTab}/>
            default:
                return <MusicPlayer setActiveTab={setActiveTab}/>;
        }
    }
    return (
        <View>
            <Header
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            {RenderScreens()}
        </View>
    )
}

export default Content
