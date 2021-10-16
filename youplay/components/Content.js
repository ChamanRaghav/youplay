import React, {useState} from 'react'
import { Text, View } from 'react-native'
import Header from './Header'
import MusicPlayer from './MusicPlayer'
import Register from './Register'

const EXPLORE = 'Explore'
const PLAYER = 'player'

function Content() {
    const [activeTab, setActiveTab] = useState(PLAYER)
    return (
        <View>
            <Header
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            {activeTab === EXPLORE? (<Register />) : (<MusicPlayer />)}
        </View>
    )
}

export default Content
