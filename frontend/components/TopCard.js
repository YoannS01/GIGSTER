import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, Platform, Button } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function TopCard(props) {
    return (
        <View style={styles.topCard}>
            <View style={styles.topImage}>
                <Image style={styles.topImg} source={props.image} />
            </View>
            <View style={styles.topDesc}>
                <Text style={{ fontWeight: 'bold' }}>{props.name}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    topCard: {
        width: 150,
        height: '80%',
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 20,
    },
    topImage: {
        width: '100%',
        height: '80%',
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 6,
        borderBottomWidth: 1,
        overflow: 'hidden'
    },
    topImg: {
        width: '105%',
        height: '105%',
    },
    topDesc: {
        width: '100%',
        height: '20%',
        backgroundColor: 'white',
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        borderTopWidth: 1,
        borderLeftWidth: 2,
        borderRightWidth: 6,
        borderBottomWidth: 6,
        paddingLeft: 10,
        paddingRight: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default TopCard