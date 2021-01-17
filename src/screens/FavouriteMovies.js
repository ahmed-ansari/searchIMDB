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

function FavouriteMoviesScreen() {
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);

    const getFavouriteMovies = async () => {
        const _movies = await Storage.getItem(FavouriteMoviesKey)
        if (_movies) setMovies(_movies)
    }

    const getSearchMovies = () => search ?
        movies.filter(movie => movie.Title.includes(search)) : movies

    const handleSearchText = searchValue => setSearch(searchValue)

    useEffect(() => {
        getFavouriteMovies()
    }, [])

    const SearchBox = (<GSearchBox
        onChangeText={handleSearchText}
        value={search}
        placeholder={'Search Favourite Movie'}
    />)

    const handleDelete = Movie => {
        Storage.removeItem(FavouriteMoviesKey, Movie, 'imdbID');
        const res = movies.filter(item => item.imdbID !== Movie.imdbID);
        setMovies(res);
        Toast
            .show(Movie.Title + ' is removed from the Favourite List')
    }

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

    const handleShare = (item) => {
        const shareOptions = {
            title: item.Title,
            message: item.Title,
            url: item.Poster,
            subject: item.Title
        };
        Share.share(shareOptions);
    }

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
        />
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', paddingTop: 10 },
    text: { fontSize: 16 }
})

export default FavouriteMoviesScreen;