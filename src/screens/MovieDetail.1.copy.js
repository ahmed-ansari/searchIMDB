import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GET_MOVIE } from './../serviceRequest/serviceConstants';
import Request from './../serviceRequest/apiRequest';
import { Colors } from '../assets/colors';
import Query from './../utils/query';
import Images from './../assets/images';

const MovieDetail = ({ route, navigation }) => {
    const { id } = route.params;

    const userQuery = {
        s: '',
    };

    // const [movie, setMovie] = useState(null);
    // const [loader, setLoader] = useState(true);

    const getMovie = async (imdbID) => {
        const params = {
            i: imdbID,
            y: 'yes',
            type: 'movie'
        }
        const result = await Request(GET_MOVIE, params);
        const { data } = result;
        // setMovie(data);
        // setLoader(false)
    }

    useEffect(() => {
        // getMovie(id)
    }, [id])

    const renderText = (label, value) => (<Text style={styles.textbox}>
        {'\u2022' + " "}
        <Text style={styles.bold}>{label}</Text>
        <Text style={styles.value}> {value}</Text>
    </Text>)

    return (
        <Query
            variables={{ param: id, key: GET_MOVIE }}
            query={userQuery}
        >
            {

                ({ result: movie, loader }) => (
                    <View style={styles.container}>
                        { loader && <ActivityIndicator color={Colors.primary} size="large" style={styles.loader} />}
                        {
                            movie &&
                            <View style={styles.container}>
                                <View style={styles.imageWrap}>
                                    {
                                        movie.Poster !== 'N/A' ?
                                            <Image source={{ uri: movie.Poster }} style={styles.image} resizeMode="contain"
                                                defaultSource={Images.noImage}
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
                    </View>
                )
            }
        </Query>
    )
}

const styles = StyleSheet.create({
    loader: { flex: 1, justifyContent: 'center' },
    container: { flex: 1, paddingHorizontal: 20, backgroundColor: Colors.white },
    imageWrap: { alignItems: 'center', marginVertical: 20 },
    image: { height: 500, width: '100%', borderRadius: 8 },
    imageIcon: { fontSize: 150, height: 200, width: 200, textAlign: 'center', color: Colors.primary },
    text: { fontSize: 18, paddingVertical: 3, width: '100%', textAlign: 'center' },
    textbox: { fontSize: 18, paddingVertical: 3, width: '100%' },
    bold: { fontSize: 18, paddingVertical: 3, fontWeight: 'bold', flex: 1 },
    value: { fontSize: 18 }
})

export default MovieDetail;