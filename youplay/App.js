import { useDimensions } from '@react-native-community/hooks';
import React, {useEffect} from 'react';
import {
  Appearance,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import Content from './components/Content';
import Footer from './components/Footer';
import Header from './components/Header'

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const colorScheme = Appearance.getColorScheme();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const {window, screen} = useDimensions()

  
  useEffect(() => {
    console.log('colorScheme in App', colorScheme, isDarkMode, StatusBar.currentHeight)
}, [colorScheme])

  return (
    <SafeAreaView style={backgroundStyle} >
     <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View
          style={[backgroundStyle, {  
            flex: 1, 
            flexDirection: 'column', 
            // backgroundColor: 'red', 
            minHeight: Dimensions.get('screen').height - 500,
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }]}> 
          <Content />
        </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
});

export default App;
