import React from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Platform
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../assets/colors';

const SearchBox = ({ onChangeText, value, placeholder }) => (
    <View style={styles.wrapper}>
        <Icon name="search" style={styles.icon} />
        <TextInput
            placeholder={placeholder}
            placeholderTextColor="grey"
            clearButtonMode="always"
            underlineColorAndroid="transparent"
            onChangeText={onChangeText}
            value={value}
            style={styles.input}
            returnKeyLabel='Done'
            returnKeyType='done'
            autoCorrect={false}
        />
    </View>
)

SearchBox.propTypes = {
    onChangeText: PropTypes.func.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string.isRequired
}

export default SearchBox;
const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        backgroundColor: Colors.white,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 10
    },
    icon: {
        fontSize: 18,
        color: Colors.grey,
    },
    input: {
        borderColor: Colors.grey,
        ...Platform.select({
            ios: { marginVertical: 10 },
        }),
        fontSize: 17,
        flex: 1,
        paddingLeft: 4
    }
})