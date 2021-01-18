import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GET_MOVIE } from './../serviceRequest/serviceConstants';
import { Colors } from '../assets/colors';
import Query from './../utils/query';
import Images from './../assets/images';

/* **************************\
Component: MovieDetailScreen.
Explanation:
This component is used for loading the Movie Detail Screen.
============================
Creator: Ansari || Date: 2020-01-18
\************************** */

const MovieDetail = ({ route, navigation }) => {
    const { id } = route.params;

    const userQuery = {
        i: '',
    };


    /* 
    * This function will render the text 
    * for the rows such as rating , year and release date 
    * */

    const renderText = (label, value) => (
        <Text style={styles.textbox}>
            {'\u2022' + " "}
            <Text style={styles.bold}>{label}</Text>
            <Text style={styles.value}> {value}</Text>
        </Text>
    )

    return (
        <Query
            variables={{ param: id, key: GET_MOVIE }}
            query={userQuery}
        >
            {

                ({ result: movie, loader, error }) => (
                    <ScrollView style={styles.container}>
                        { loader && <ActivityIndicator color={Colors.primary} size="large" style={styles.loader} />}

                        {
                            error &&
                            <Text style={styles.error}>{error.message + '. Please try later.' || 'Error while fetching data'}</Text >
                        }
                        {
                            !loader && movie && !error &&
                            <View style={styles.container}>
                                <View style={styles.imageWrap}>
                                    {
                                        movie.Poster !== 'N/A' ?
                                            <Image source={{ uri: movie.Poster }} style={styles.image} resizeMode="contain"
                                                defaultSource={Images.noIcon}
                                            /> :
                                            <Icon name="eye-slash" style={styles.imageIcon} />
                                    }
                                    {movie.Poster === 'N/A' && <Text style={styles.text}>IMAGE NOT AVAILABLE</Text>}
                                </View>
                                {renderText('Imdb Rating:', movie.imdbRating)}
                                {renderText('Year:', movie.Year)}
                                {renderText('Released Date:', movie.Released)}
                            </View>
                        }
                    </ScrollView>
                )
            }
        </Query>
    )
}

/* 
*   Styles Object for the Movie detail screen
* */

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 20, backgroundColor: Colors.white, paddingBottom: 20 },
    loader: { marginTop: '50%' },
    imageWrap: { alignItems: 'center', marginVertical: 20 },
    image: { height: 500, width: '100%', borderRadius: 8 },
    imageIcon: { fontSize: 150, height: 200, width: 200, textAlign: 'center', color: Colors.grey },
    text: { fontSize: 18, paddingVertical: 3, width: '100%', textAlign: 'center' },
    textbox: { fontSize: 18, paddingVertical: 3, width: '100%' },
    bold: { fontSize: 18, paddingVertical: 3, fontWeight: 'bold', flex: 1 },
    value: { fontSize: 18 },
    error: { fontSize: 16, marginHorizontal: 10, textAlign: 'center', marginTop: 20, color: Colors.love },

})

export default MovieDetail;