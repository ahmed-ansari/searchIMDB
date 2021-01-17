import React, { useState, useCallback, useReducer } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    Share,
    ActivityIndicator
} from 'react-native';
import Toast from 'react-native-simple-toast';
import debounce from 'lodash.debounce';
import { GSearchBox, GMovieCard } from './../commonComponents';
import Request from './../serviceRequest/apiRequest';
import { GET_MOVIES } from './../serviceRequest/serviceConstants';
import { Colors } from '../assets/colors';
import Storage, { FavouriteMoviesKey } from '../utils/localStorage';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_MOVIES_START':
            return { ...state, loader: action.loader, search: action.search, }
        case 'FETCH_MOVIES_SUCCESS':
            return { ...state, loader: action.loader, movies: action.movies }
        case 'SET_LOADER':
            return { ...state, loader: action.loader }
        default:
            throw new Error('Unexpected action');
    }
}

function SearchMoviesScreen({ navigation }) {

    // const [search, setSearch] = useState('');
    // const [movies, setMovies] = useState([]);
    // const [loader, setLoader] = useState(false);

    const initialState = {
        search: '',
        movies: [],
        loader: false
    }

    // const [{ search, movies, loader }, setState] = useReducer(reducer, initialState);
    const [{ search, movies, loader }, setState] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        initialState
    );


    const searchMovies = async (movie) => {
        const params = {
            s: movie,
            y: 'yes',
            type: 'movie'
        }
        const result = await Request(GET_MOVIES, params);
        const { data } = result;
        const { Search } = data;
        // setLoader(false);
        // setMovies(Search);
        // setState({ type: 'FETCH_MOVIES_SUCCESS', loader: false, movies: Search })
        setState({ loader: false, movies: Search })
    }

    const debouncedSave = useCallback(
        debounce(searchValue => searchMovies(searchValue), 1000),
        []);


    const handleChangeText = searchValue => {
        // setLoader(true);
        // setSearch(searchValue);
        // setState({ type: 'FETCH_MOVIES_START', search: searchValue, loader: true })
        setState({ search: searchValue, loader: true })
        if (searchValue.length > 0) {
            debouncedSave(searchValue)
        } else {
            setState({ loader: false })

        }
    }

    const SearchBox = (<GSearchBox
        onChangeText={handleChangeText}
        value={search}
        placeholder={'Search Movie'} />)

    const handleFavourite = (Movie) => {
        Toast.show(Movie.Title + ' is added to the Favourite List');
        Storage.pushItem(FavouriteMoviesKey, Movie, 'imdbID');
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
    const handleTouch = Movie => {
        navigation.navigate('MovieDetail', { name: Movie.Title, id: Movie.imdbID })
    }

    const renderMovieItem = ({ item }) => <GMovieCard
        item={item}
        handleFavourite={handleFavourite.bind(null, item)}
        handleShare={handleShare}
        handleTouch={handleTouch.bind(null, item)}
    />

    const renderEmpty = () => (
        <>
            { loader && <ActivityIndicator color={Colors.primary} size="large" style={styles.loader} />}
            {!loader && <View style={styles.container}>
                <Text style={styles.text}>{search.length > 0 ? 'No Movies found' : 'Search Movie by typing a word or phrase in the search box'}</Text>
            </View>}
        </>
    )

    return (
        <FlatList
            data={movies}
            renderItem={renderMovieItem}
            keyExtractor={item => item.imdbID}
            ListHeaderComponent={SearchBox}
            ListEmptyComponent={renderEmpty()}
        />
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', paddingTop: 10 },
    text: { fontSize: 16, marginHorizontal: 10 },
    loader: {
        marginTop: 40
    }
})

export default SearchMoviesScreen;