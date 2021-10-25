import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  ndler,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Appearance,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import TrackPlayer, {
  State,
  useProgress,
  usePlaybackState,
  RepeatMode,
} from 'react-native-track-player';

const {Off, Queue, Track} = RepeatMode;
const SONGS_LIST = 'SongsList';
const LOCAL_MUSIC_FILES = 'LocalMusicFiles'

function MusicPlayer({setActiveTab, currentTrack, setCurrentTrack}) {
  const [repeateMode, setRepeateMode] = useState(Off);
  const [isFavorite, setIsFavorite] = useState(true);
  const progress = useProgress();
  const playbackState = usePlaybackState();
  const heartOpacity = useRef(new Animated.Value(1)).current;
  const heartOutlineOpacity = useRef(new Animated.Value(1)).current;
  const songImageOpacity = useRef(new Animated.Value(1)).current;

  const colorScheme = Appearance.getColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const iconColor = isDarkMode ? '#fff' : '#000';

  const applyAnimation = (prop, toValue, duration) =>
    Animated.timing(prop, {
      toValue,
      duration,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();

  const handleFavoriteSelection = value => {
    applyAnimation(value ? heartOutlineOpacity : heartOpacity, 0, 500);
    setTimeout(() => {
      setIsFavorite(!value);
      applyAnimation(value ? heartOpacity : heartOutlineOpacity, 1, 500);
    }, 500);
  };

  const handleRepeatMode = () => {
    if (repeateMode === Off) {
      TrackPlayer.setRepeatMode(Queue);
      setRepeateMode(Queue);
    } else if (repeateMode === Queue) {
      TrackPlayer.setRepeatMode(Track);
      setRepeateMode(Track);
    } else {
      TrackPlayer.setRepeatMode(Off);
      setRepeateMode(Off);
    }
  };

  const getRepeatIcon = () => {
    if (repeateMode === Off) return 'repeat-off';
    else if (repeateMode === Queue) return 'repeat';
    else return 'repeat-once';
  };

  const getCurrentTrackId = async () => {
    const currentTrackId = await TrackPlayer.getCurrentTrack();
    if (currentTrackId !== null) {
      const currentTrackInfo = await TrackPlayer.getTrack(currentTrackId);
      setCurrentTrack(currentTrackInfo);
    }
    return currentTrackId;
  };

  const playNext = async () => {
    applyAnimation(songImageOpacity, 0, 500);
    await TrackPlayer.skipToNext();
    setTimeout(async () => {
      applyAnimation(songImageOpacity, 1, 500);
      await getCurrentTrackId();
    }, 500);
  };
  const playPrevious = async () => {
    applyAnimation(songImageOpacity, 0, 500);
    await TrackPlayer.skipToPrevious();
    setTimeout(async () => {
      applyAnimation(songImageOpacity, 1, 500);
      await getCurrentTrackId();
    }, 500);
  };

  const playPauseMusic = async playbackState => {
    const currentTrackId = await TrackPlayer.getCurrentTrack();
    console.log('currentTrack', currentTrackId);
    if (currentTrackId !== null) {
      const currentTrackInfo = await TrackPlayer.getTrack(currentTrackId);
      console.log('currentTrackInfo', currentTrackInfo);
      setCurrentTrack(currentTrackInfo);
      if (playbackState === State.Paused) await TrackPlayer.play();
      else await TrackPlayer.pause();
    }
  };

  const PlayerControlButtons = () => (
    <View style={styles.playerControlButtonsStyle}>
      <TouchableWithoutFeedback onPress={playPrevious}>
        <View style={styles.prevNextIconViewStyle}>
          <Icon name="caret-left" size={70} color={iconColor} />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => playPauseMusic(playbackState)}>
        {playbackState === State.Playing ? (
          <Icon name="pause-circle" size={80} color={iconColor} />
        ) : (
          <Icon name="play-circle" size={80} color={iconColor} />
        )}
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={playNext}>
        <View style={styles.prevNextIconViewStyle}>
          <Icon name="caret-right" size={70} color={iconColor} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );

  return (
    <>
      <View style={styles.playerContainerStyle}>
        <Animated.View
          style={[
            styles.songImageViewStyle,
            {
              opacity: songImageOpacity,
              shadowColor: isDarkMode ? 'white' : 'orange',
            },
          ]}>
          <Image
            style={styles.songImageStyle}
            source={{uri: currentTrack?.artwork || 'https://picsum.photos/200'}}
            minHeight={412}
          />
        </Animated.View>

        <View style={styles.songsNameMoreViewStyle}>
          <View style={styles.songNameInfoViewStyle}>
            <Text style={styles.songNameTextStyle}>{currentTrack?.title}</Text>
            <Text style={styles.songInfoTextStyle}>
              {currentTrack?.artist}{' '}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setActiveTab(SONGS_LIST)}>
            <View style={styles.moreVertIconStyle}>
              <MaterialIcons name="library-music" size={40} color={iconColor} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.sliderAndTimerViewStyle}>
          <Slider
            style={styles.sliderStyle}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            minimumTrackTintColor={isDarkMode ? '#fff' : '#000'}
            maximumTrackTintColor="lightgrey"
            tapToSeek={true}
            onSlidingComplete={async value => await TrackPlayer.seekTo(value)}
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

        <PlayerControlButtons />
      </View>
      <View
        style={[
          styles.repeatControlStyle,
          {
            borderTopColor: isDarkMode ? '#fff' : '#000',
            backgroundColor: isDarkMode ? '#000' : '#fff',
          },
        ]}>
        <TouchableWithoutFeedback
          onPress={() => handleFavoriteSelection(isFavorite)}>
          {!isFavorite ? (
            <Animated.View
              style={[styles.heartIconStyle, {opacity: heartOpacity}]}>
              <MaterialCommunityIcon name="heart" size={40} color="red" />
            </Animated.View>
          ) : (
            <Animated.View
              style={[styles.heartIconStyle, {opacity: heartOutlineOpacity}]}>
              <MaterialCommunityIcon
                name="heart-outline"
                size={40}
                color={iconColor}
              />
            </Animated.View>
          )}
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={handleRepeatMode}>
          <View style={styles.heartIconStyle}>
            <MaterialCommunityIcon
              name={getRepeatIcon()}
              size={40}
              color={iconColor}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setActiveTab(SONGS_LIST)}>
          <View style={styles.heartIconStyle}>
            <MaterialCommunityIcon
              name={'playlist-music'}
              size={40}
              color={iconColor}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setActiveTab(LOCAL_MUSIC_FILES)}>
          <View style={styles.heartIconStyle}>
            <MaterialCommunityIcon
              name={'folder-music'}
              size={40}
              color={iconColor}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sliderStyle: {
    width: '100%',
    height: 30,
  },
  prevNextIconViewStyle: {
    borderRadius: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  moreVertIconStyle: {
    borderRadius: 35,
  },
  heartIconStyle: {
    borderRadius: 35,
    padding: 7,
    maxHeight: 55,
  },
  timerTextStyle: {},
  playedTimerViewStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  songImageStyle: {
    borderRadius: 20,
  },
  songImageViewStyle: {
    borderRadius: 45,
    minHeight: 350,
    flex: 6,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 1,
    shadowRadius: 19.0,
    elevation: 40,
  },
  songsNameMoreViewStyle: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sliderAndTimerViewStyle: {
    flex: 1,
  },
  playerControlButtonsStyle: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10,
  },
  playerContainerStyle: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: '2%',
    flex: 200,
  },
  repeatControlStyle: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 0,
    borderTopWidth: 0.25
  },
  songNameInfoViewStyle: {},
  songNameTextStyle: {
    fontSize: 32,
    fontWeight: '400',
  },
  songInfoTextStyle: {
    fontSize: 20,
    fontWeight: '300',
  },
});

export default MusicPlayer;
