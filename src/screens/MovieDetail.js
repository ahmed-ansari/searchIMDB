import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { GET_MOVIE } from './../serviceRequest/serviceConstants';
import Request from './../serviceRequest/apiRequest';
import { Colors } from '../assets/colors';

const MovieDetail = ({ route, navigation }) => {
    const { id } = route.params;

    const [movie, setMovie] = useState(null);
    const [loader, setLoader] = useState(true);

    const getMovie = async (imdbID) => {
        const params = {
            i: imdbID,
            y: 'yes',
            type: 'movie'
        }
        const result = await Request(GET_MOVIE, params);
        const { data } = result;
        setMovie(data);
        setLoader(false)
    }

    useEffect(() => {
        getMovie(id)
    }, [id])

    return (
        <>
            { loader && <ActivityIndicator color={Colors.primary} size="large" style={styles.loader} />}
            {
                movie &&
                <View style={styles.container}>
                    <View style={styles.imageWrap}>
                        {
                            movie.Poster !== 'N/A' ?
                                <Image source={{ uri: movie.Poster }} style={styles.image} /> :
                                <Icon name="camera-off" style={styles.imageIcon} />
                        }
                        {
                            movie.Poster === 'N/A' &&
                            <Text style={styles.text}>IMAGE NOT AVAILABLE</Text>
                        }
                    </View>
                    <Text style={styles.text}>{'\u2022' + " "} Imdb Rating: {movie.imdbRating}</Text>
                    <Text style={styles.text}>{'\u2022' + " "} Year: {movie.Year}</Text>
                    <Text style={styles.text}>{'\u2022' + " "} Released Date: {movie.Released}</Text>
                </View>
            }

        </>
    )
}

const styles = StyleSheet.create({
    loader: { flex: 0.5, justifyContent: 'center' },
    container: { flex: 1, marginHorizontal: 20 },
    imageWrap: { alignItems: 'center', marginVertical: 20 },
    image: { height: 200, width: 200, borderRadius: 8 },
    imageIcon: { fontSize: 150, height: 200, width: 200, textAlign: 'center', color: Colors.primary },
    text: { fontSize: 18, paddingVertical: 3 }
})

export default MovieDetail;