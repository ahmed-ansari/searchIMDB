import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Colors } from '../assets/colors';

/* **************************\
Component: Button.
Explanation:
This component is used for showing the button
============================
Creator: Ansari || Date: 2020-01-18
\************************** */

const Button = ({ onPress, style, title, icon }) => (
    <TouchableOpacity onPress={onPress} style={styles.button}>
        <Icon name={icon} style={styles.icon} />
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
)

Button.propTypes = {
    onPress: PropTypes.func,
    style: PropTypes.object,
    title: PropTypes.string,
    icon: PropTypes.string
}

Button.defaultProps = {
    onPress: () => { },
    title: 'Click',
    icon: 'home',
}
export default Button;

const styles = StyleSheet.create({
    button: {
        flex: 0.5,
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        marginVertical: 10,
        marginHorizontal: 10,
        padding: 10,
        height: 160,
        borderRadius: 5,
    },
    text: {
        color: Colors.white,
        fontSize: 20,
        alignSelf: 'center',
        textAlign: 'center'
    },
    icon: {
        alignSelf: 'center',
        color: Colors.white,
        fontSize: 24,
        marginBottom: 8
    }
})