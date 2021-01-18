import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { GButton } from './../commonComponents';

/* **************************\
Component: HomeScreen.
Explanation:
This component is used for loading the Home Screen.
============================
Creator: Ansari || Date: 2020-01-17
\************************** */

function HomeScreen({ navigation }) {

    // This function navigate users to the Search Movies Screen
    const handleSearch = () => {
        navigation.navigate('SearchMovies');
    }

    // This function navigate users to the Favourite Screen
    const handleFavourites = () => {
        navigation.navigate('FavouriteMovies');
    }

    return (
        <View style={styles.container}>
            <GButton title="Search Movies" icon="search" onPress={handleSearch} />
            <GButton title="View User’s Favorite Movies" icon="heart" onPress={handleFavourites} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: { backgroundColor: Colors.white, justifyContent: 'space-around', flex: 1, alignItems: 'center', flexDirection: 'row' }
})
export default HomeScreen;