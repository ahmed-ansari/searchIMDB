import React, { useState } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    Share,
    ActivityIndicator
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { GET_MOVIES } from './../serviceRequest/serviceConstants';
import { GSearchBox, GMovieCard } from './../commonComponents';
import { Colors } from '../assets/colors';
import Storage, { FavouriteMoviesKey } from '../utils/localStorage';
import Query from './../utils/query';

/* **************************\
Component: SearchMoviesScreen.
Explanation:
This component is used for loading the Search Movies Screen.
============================
Creator: Ansari || Date: 2020-01-17
\************************** */

function SearchMoviesScreen({ navigation }) {

    const userQuery = {
        s: '',
    };


    const [search, setSearch] = useState('');

    // This function updates the search variable with user inputted text
    const handleChangeText = searchValue => {
        setSearch(searchValue)
    }

    /* This function will Save Movie to local async store on heart icon touch and
    * and shows Toast to the user that the movies has been added 
    * to the favourite list sucessfully
    */

    const handleFavourite = (Movie) => {
        Toast.show(Movie.Title + ' is added to the Favourite List');
        Storage.pushItem(FavouriteMoviesKey, Movie, 'imdbID');
    }

    /* This function will share selected movie to social such as whatsapp , gmail etc */

    const handleShare = item => {
        const shareOptions = {
            title: item.Title,
            message: item.Title + ' ' + item.Poster,
            url: item.Poster,
            subject: item.Title
        };
        Share.share(shareOptions);
    }

    /*  This function will navigate user to the Movie Detail Screen */

    const handleTouch = Movie => navigation.
        navigate('MovieDetail', { name: Movie.Title, id: Movie.imdbID })

    /* This function renders the Searchbox to the screen */

    const SearchBox = (<GSearchBox
        onChangeText={handleChangeText}
        value={search}
        placeholder={'Search'} />)

    /* This function renders the movie card for each row in the flatlist  */

    const renderMovieItem = ({ item }) => (<GMovieCard
        item={item}
        handleFavourite={handleFavourite.bind(null, item)}
        handleShare={handleShare}
        handleTouch={handleTouch.bind(null, item)} />)

    /*  This function will renders the empty component for the flat list component
    *  when there is no record 
    */

    const renderEmpty = (loader, error) => (
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
                error &&
                <Text style={styles.error}>{`${error.message}. Please try again.` || 'Error while fetching data'}</Text>
            }
            {
                !loader && !error &&
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
            <Query
                variables={{ param: search, key: GET_MOVIES }}
                query={userQuery}
            >
                {
                    ({ result: { Search }, loader, error }) => console.log('movie', Search) || (
                        <FlatList
                            data={Search}
                            renderItem={renderMovieItem}
                            keyExtractor={item => item.imdbID}
                            ListHeaderComponent={SearchBox}
                            style={styles.flatlist}
                            ListEmptyComponent={renderEmpty(loader, error)}
                        />
                    )
                }
            </Query>

        </>
    )
}

// Styles Object
const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', paddingTop: 10, },
    text: { fontSize: 16, marginHorizontal: 10, textAlign: 'center' },
    error: { fontSize: 16, marginHorizontal: 10, textAlign: 'center', marginTop: 20, color: Colors.love },
    loader: { marginTop: 40 },
    flatlist: { backgroundColor: 'white' }
})

export default SearchMoviesScreen;