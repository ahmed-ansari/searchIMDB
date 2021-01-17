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
import Request from './../serviceRequest/apiRequest';
import { GET_MOVIES } from './../serviceRequest/serviceConstants';
import { GSearchBox, GMovieCard } from './../commonComponents';
import { Colors } from '../assets/colors';
import Storage, { FavouriteMoviesKey } from '../utils/localStorage';
import Query from './../utils/query';


function SearchMoviesScreen({ navigation }) {


    const [search, setSearch] = useState('');

    const handleChangeText = searchValue => {
        setSearch(searchValue)
    }


    const handleFavourite = (Movie) => {
        Toast.show(Movie.Title + ' is added to the Favourite List');
        Storage.pushItem(FavouriteMoviesKey, Movie, 'imdbID');
    }

    const handleShare = item => {
        const shareOptions = {
            title: item.Title,
            message: item.Title,
            url: item.Poster,
            subject: item.Title
        };
        Share.share(shareOptions);
    }

    const handleTouch = Movie => navigation.
        navigate('MovieDetail', { name: Movie.Title, id: Movie.imdbID })


    const SearchBox = (<GSearchBox
        onChangeText={handleChangeText}
        value={search}
        placeholder={'Search Movie'} />)

    const renderMovieItem = ({ item }) => (<GMovieCard
        item={item}
        handleFavourite={handleFavourite.bind(null, item)}
        handleShare={handleShare}
        handleTouch={handleTouch.bind(null, item)} />)

    const renderEmpty = (loader) => console.log('loader', search) || (
        <>
            {
                loader &&
                <ActivityIndicator
                    color={Colors.primary}
                    size="large"
                    style={styles.loader}
                />
            }
            {
                !loader &&
                <View style={styles.container}>
                    <Text style={styles.text}>{search.length > 0 ?
                        'No Movies found' :
                        'Search Movie by typing a word or phrase in the search box'}
                    </Text>
                </View>
            }
        </>
    )

    return (
        <>
            <Query variables={{ search }}>
                {
                    ({ _, movies, loader }) => (
                        <FlatList
                            data={movies}
                            renderItem={renderMovieItem}
                            keyExtractor={item => item.imdbID}
                            ListHeaderComponent={SearchBox}
                            ListEmptyComponent={renderEmpty(loader)}
                        />
                    )
                }
            </Query>

        </>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', paddingTop: 10 },
    text: { fontSize: 16, marginHorizontal: 10 },
    loader: { marginTop: 40 }
})

export default SearchMoviesScreen;