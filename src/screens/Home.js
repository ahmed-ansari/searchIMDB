import React, { useEffect } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Button
} from 'react-native';
import { GButton } from './../commonComponents';

function HomeScreen({ navigation }) {
    const handleSearch = () => {
        navigation.navigate('SearchMovies');
    }

    const handleFavourites = () => {
        navigation.navigate('FavouriteMovies');

    }
    return (
        <View style={styles.container}>
            <GButton title="Search Movies" icon="search" onPress={handleSearch} />
            <GButton title="Favourite Movies" icon="heart" onPress={handleFavourites} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: { justifyContent: 'space-around', flex: 1, alignItems: 'center', flexDirection: 'row' }
})
export default HomeScreen;