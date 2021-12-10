import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { io } from "socket.io-client";

export default function App() {
    console.log('In app');
    const socket = io('http://localhost:3000');

    socket.on('counter', (counter) => {
        console.log(counter + 's');
    });

    useEffect(() => {
        return () => { console.log('disconnecting socket'); socket.disconnect(); };
    }, []);
    
    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
