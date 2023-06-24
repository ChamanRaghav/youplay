

import TrackPlayer, {Event} from 'react-native-track-player';

module.exports = async function () {

    await TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());

    await TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());

    await TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.destroy());

    await TrackPlayer.addEventListener(Event.RemoteSeek, (value) => TrackPlayer.seekTo(value));
    // ...

};