import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    View,
    TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { Colors } from '../assets/colors';
import Images from './../assets/images';

/* **************************\
Component: MovieCard.
Explanation:
This component is used for loading the  Movie items for each item
in the flatlist .
============================
Creator: Ansari || Date: 2020-01-18
\************************** */

const MovieCard = ({ handleTouch, handleShare, handleFavourite, handleDelete, item }) => {
    const { Poster, Title, Year } = item;

    const [favourite, setFavourite] = useState(false);
    return (
        <TouchableOpacity onPress={handleTouch} style={styles.button}>
            {
                Poster !== 'N/A' ?
                    <View style={styles.imageBox}>
                        <Image source={{ uri: Poster }}
                            style={styles.image}
                            defaultSource={Images.noIcon}
                        />
                    </View>
                    :
                    <Icon name="eye-slash" style={styles.imageIcon} />
            }

            <View style={styles.metaData}>
                <View style={styles.textbox}>
                    <Text style={styles.title} numberOfLines={2}>{Title}</Text>
                    <Text style={styles.year} >Year: {Year}</Text>
                </View>
                <View style={styles.actionBtn}>
                    {handleFavourite && (<TouchableHighlight onPress={handleFavourite}
                        onShowUnderlay={() => setFavourite(true)}
                        onHideUnderlay={() => setFavourite(false)}
                        underlayColor={'transparent'}
                    >
                        <Icon name={favourite ? "heart" : 'heart-o'} style={[styles.fav, favourite ? styles.like : null]} />
                    </TouchableHighlight>)}
                    <Icon name="share-alt" onPress={() => handleShare(item)} style={styles.msg} />
                    {handleDelete && <Icon name="trash-o" onPress={handleDelete} style={styles.del} />}
                </View>
            </View>

        </TouchableOpacity>
    )
};

MovieCard.propTypes = {
    handleTouch: PropTypes.func,
    handleShare: PropTypes.func,
    handleFavourite: PropTypes.func,
    handleDelete: PropTypes.func,
    item: PropTypes.object.isRequired,
}
MovieCard.defaultProps = {
    handleTouch: () => { },
    handleShare: () => { },
    item: {},
}
export default MovieCard;

const styles = StyleSheet.create({
    button: { flexDirection: 'row', paddingVertical: 8, marginHorizontal: 10, borderBottomWidth: 1, borderBottomColor: 'lightgrey' },
    image: { height: 120, width: 120, borderRadius: 6 },
    imageBox: { height: 120, width: 120, borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
    imageIcon: { backgroundColor: Colors.white, fontSize: 100, height: 120, width: 120, textAlign: 'center', color: Colors.grey, },
    title: { fontSize: 20, width: '95%', marginTop: 3, },
    year: { fontSize: 18, marginTop: 6, },
    fav: { color: Colors.primary, fontSize: 20, padding: 5, marginBottom: 6, marginHorizontal: 4 },
    del: { color: Colors.primary, fontSize: 20, padding: 5, marginBottom: 6, marginHorizontal: 4 },
    msg: { color: Colors.primary, fontSize: 20, padding: 5, marginBottom: 6, marginHorizontal: 4 },
    textbox: { marginLeft: 6, flex: 1 },
    actionBtn: { flexDirection: 'row', marginTop: 10, marginLeft: 4 },
    like: { color: Colors.love },
    metaData: { flex: 1 }
})