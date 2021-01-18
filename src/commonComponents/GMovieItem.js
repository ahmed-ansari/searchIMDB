import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    View,
    ActivityIndicator,
    TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { Colors } from '../assets/colors';

const MovieCard = ({ handleTouch, handleShare, handleFavourite, handleDelete, item }) => {
    const { Poster, Title, Year } = item;
    const Indicator = <ActivityIndicator />;

    const [favourite, setFavourite] = useState(false);
    return (
        <TouchableOpacity onPress={handleTouch} style={styles.button}>
            {
                Poster !== 'N/A' ?
                    <Image source={{ uri: Poster }}
                        style={styles.image}
                        loadingIndicatorSource={Indicator}
                    /> :
                    <Icon name="camera-off" style={styles.imageIcon} />
            }

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
export default MovieCard;

const styles = StyleSheet.create({
    button: { flexDirection: 'row', paddingVertical: 8, marginHorizontal: 10, borderBottomWidth: 1, borderBottomColor: 'lightgrey', },
    image: { height: 100, width: 100, borderRadius: 6 },
    imageIcon: { fontSize: 50, height: 80, width: 80, textAlign: 'center', color: Colors.primary },
    title: { fontSize: 18, width: '95%', marginTop: 3 },
    year: { fontSize: 16, marginTop: 6, },
    fav: { color: Colors.primary, fontSize: 20, padding: 5, marginBottom: 6 },
    del: { color: Colors.primary, fontSize: 20, padding: 5, marginTop: 6 },
    msg: { color: Colors.primary, fontSize: 20, padding: 5 },
    textbox: { marginLeft: 5, flex: 1 },
    actionBtn: { justifyContent: 'center', },
    like: { color: Colors.love }
})