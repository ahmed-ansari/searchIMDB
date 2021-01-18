import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    Share,
    Alert
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { GSearchBox, GMovieCard } from './../commonComponents';
import Storage, { FavouriteMoviesKey } from '../utils/localStorage';
import { Colors } from 'react-native/Libraries/NewAppScreen';

/* **************************\
Component: FavouriteMoviesScreen.
Explanation:
This component is used for loading the Favourite Movies Screen.
============================
Creator: Ansari || Date: 2020-01-17
\************************** */

function FavouriteMoviesScreen() {
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);

    /* This function will fetch all favourite movies from the local async storage */

    const getFavouriteMovies = async () => {
        const _movies = await Storage.getItem(FavouriteMoviesKey)
        if (_movies) setMovies(_movies)
    }

    /*  This function will returns filtered array from movie list
    based on the user input text in searchbox */

    const getSearchMovies = () => search ?
        movies.filter(movie => movie.Title.includes(search)) : movies

    /* This function will update the user inputted text to the seach variable */

    const handleSearchText = searchValue => setSearch(searchValue)

    /* This function will fetch all movies from the local store only once */

    useEffect(() => {
        getFavouriteMovies()
    }, [])

    /* This function will render the search box the screen */

    const SearchBox = (<GSearchBox
        onChangeText={handleSearchText}
        value={search}
        placeholder={'Search'}
    />)

    /* This function will handles the delete operation from the local store */

    const handleDelete = Movie => {
        Storage.removeItem(FavouriteMoviesKey, Movie, 'imdbID');
        const res = movies.filter(item => item.imdbID !== Movie.imdbID);
        setMovies(res);
        Toast
            .show(Movie.Title + ' is removed from the Favourite List')
    }

    /* THis function will confirms the user if he want to delete it for sure */

    const handleConfirm = (Movie) => {
        Alert.alert(
            'Are you sure?',
            'You won\'t be able to revert this! ',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                { text: 'OK', onPress: () => handleDelete(Movie) }
            ],
            { cancelable: false }
        );
    }

    /* This function will share movie to social groups such as gmail, whtsapp, etc. */

    const handleShare = (item) => {
        const shareOptions = {
            title: item.Title,
            message: item.Title + ' ' + item.Poster,
            url: item.Poster,
            subject: item.Title
        };
        Share.share(shareOptions);
    }

    /* This function will renders the empty component to the flat list when nothing to show */

    const renderEmpty = () => {
        const comp = (<View style={styles.container}>
            <Text style={styles.text}>{'No Favourite Movies found.'}</Text>
        </View>)
        return (
            <>
                {(search.length === 0 && movies.length === 0) && comp}
                {(search.length > 0 && getSearchMovies().length === 0) && comp}
            </>
        )
    }

    return (
        <FlatList
            data={getSearchMovies()}
            renderItem={({ item }) => <GMovieCard
                item={item}
                handleDelete={handleConfirm.bind(null, item)}
                handleShare={handleShare}
            />}
            keyExtractor={item => item.imdbID}
            ListHeaderComponent={SearchBox}
            ListEmptyComponent={renderEmpty()}
            style={styles.flatlist}
        />
    )
}

// styles object
const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', paddingTop: 10, backgroundColor: Colors.white },
    text: { fontSize: 16 },
    flatlist: { backgroundColor: 'white' }

})

export default FavouriteMoviesScreen;