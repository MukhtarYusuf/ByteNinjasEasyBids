import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useRef} from 'react';
import { StyleSheet, Text, View } from 'react-native';

/* 1. Install socket.io-client in the react-native project.
    - npm install socket.io-client
    - in express folder on backend just run npm install as usual */
import { io } from "socket.io-client";

export default function App() {
    /* 2.  UseRef to persist the socket variable */
    const mSocket = useRef(null);

    // Sample place bid method
    const placeBid = () => {
        const params = {
            userId: 'someUserId',
            productId: 'someProductId',
        };

        /* 6. How to place a bid using the socket 
            - Must send params object with userId and productId */
        mSocket.current.emit('place-bid', params);
    }

    useEffect(() => {
        /* 3. Initialize the socket with the server url */
        mSocket.current = io('http://localhost:3000');

        /* 4. Listen for time left updates.
            - This will execute every second with updated timeLeft for each product
            - The callback has an array of products as a param. I changed some keys of products so look at console log please. */
        mSocket.current.on('time-left-update', (products) => {
            console.log(products);
        });

        /* 5. Listen for bid updates. 
            - The callback is a json object with:
                 - all products
                 - the product that was just bid on
                 - current user object with updated tokens left 
                 - error message or null if none 
                 - Look at console log */
        mSocket.current.on('bid-update', (response) => {
            console.log(response);
        });

        return () => { 
            console.log('disconnecting socket'); 
            mSocket.current.disconnect(); 
        };
    }, []);
    
    // Render
    return (
        <View style={styles.container}>
            <Text>This is the app.</Text>
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
