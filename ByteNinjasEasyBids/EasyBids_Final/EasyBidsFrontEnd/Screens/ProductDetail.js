import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Image, Alert,Button } from 'react-native';


export default function ProductDetail() {
    return (
        <View>
            <Text>This is product detail page</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    text: {
        padding: 40,
        fontSize: 30,
        fontWeight: '700',
        textAlign: 'center',
    },
    textInput: {
        fontSize: 18,
        padding: 15,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#d3d3d3',
        width: '100%',
    },
    btn: {
        width: '100%',
        marginTop: 10,
        marginBottom:10,
    },
});