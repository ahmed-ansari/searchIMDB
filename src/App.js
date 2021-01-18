import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  View
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import ErrorBoundary from 'react-native-error-boundary';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Colors } from './assets/colors';
import HomeScreen from './screens/Home';
import SearchMoviesScreen from './screens/SearchMovies';
import FavouriteMoviesScreen from './screens/FavouriteMovies';
import MovieDetailScreen from './screens/MovieDetail';


Icon.loadFont();
const RootStack = createStackNavigator();


/* 
* This function return Root Navigation for the app,
* it holds all the screen and configured using the react navigation
*/

const RootNavigator = () => (
  <RootStack.Navigator initialRouteName="Home" >
    <RootStack.Screen name="Home" component={HomeScreen} options={{ title: 'Home', headerShown: false }} />
    <RootStack.Screen name="SearchMovies" component={SearchMoviesScreen} options={{ title: 'Search Movies' }} />
    <RootStack.Screen name="MovieDetail" component={MovieDetailScreen} options={({ route }) => ({ title: route.params.name })} />
    <RootStack.Screen name="FavouriteMovies" component={FavouriteMoviesScreen} options={{ title: 'Favourite Movies' }} />
  </RootStack.Navigator>)


const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  /* This function is Error fallback component and 
  * return a message to the sreen if found any error 
  */

  const ErrorFallback = ({ error }) => {
    return (
      <View style={styles.errorBoundary}>
        <Text style={styles.error}>{error.toString()}</Text>
      </View>
    )
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeAreaView}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </ErrorBoundary>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  error: { fontSize: 16, marginHorizontal: 10, textAlign: 'center', marginTop: 20, color: Colors.love },
  errorBoundary: { flex: 1, justifyContent: 'center' }
});

export default App;
