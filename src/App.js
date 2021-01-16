import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/Feather'


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Colors } from './assets/colors';
import HomeScreen from './screens/Home';
import SearchMoviesScreen from './screens/SearchMovies';
import FavouriteMoviesScreen from './screens/FavouriteMovies';
import MovieDetailScreen from './screens/MovieDetail';
Icon.loadFont();
const RootStack = createStackNavigator();

const RootNavigator = () => (
  <RootStack.Navigator initialRouteName="Home">
    <RootStack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
    <RootStack.Screen name="SearchMovies" component={SearchMoviesScreen} options={{ title: 'Search Movies' }} />
    <RootStack.Screen name="MovieDetail" component={MovieDetailScreen} options={({ route }) => ({ title: route.params.name })} />
    <RootStack.Screen name="FavouriteMovies" component={FavouriteMoviesScreen} options={{ title: 'Favourite Movies' }} />
  </RootStack.Navigator>)


const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeAreaView}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};




const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  scrollView: {
    backgroundColor: Colors.white,
    flex: 1,
  },
});

export default App;
