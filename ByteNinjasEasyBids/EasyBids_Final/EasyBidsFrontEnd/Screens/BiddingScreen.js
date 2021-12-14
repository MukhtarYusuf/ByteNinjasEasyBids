import React, { useEffect , useLayoutEffect , useRef} from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Alert, Button ,FlatList } from 'react-native';
import ProjectListItem from '../Components/ProjectListItem';
import { currentUser , MongoCurUser } from '../Firebase/config';

import { io } from "socket.io-client";


const axios = require('axios');

export default function BiddingScreen({navigation}) {
  const [projects, setProjects] = useState([]); 

  //new

  const mSocket = useRef(null);
  
  // Sample place bid method
      const placeBid = (productID) => {
        console.log("****"+JSON.stringify(MongoCurUser._id));
      const params = {
          userId: MongoCurUser._id,
          productId: productID,
      };

        /* 6. How to place a bid using the socket 
            - Must send params object with userId and productId */
      mSocket.current.emit('place-bid', params);
  }

  //getting Curuser


  const getProducts = () => {
    axios.get('http://localhost:3000/products')
    .then(function (response) {
      // console.log(response.data);
      setProjects(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

useEffect(() => {

    /* 3. Initialize the socket with the server url */
    mSocket.current = io('http://localhost:3000');

    /* 4. Listen for time left updates.
        - This will execute every second with updated timeLeft for each product
        - The callback has an array of products as a param. I changed some keys of products so look at console log please. */
    mSocket.current.on('time-left-update', (products) => {
       // console.log(products);
       setProjects(products);
    });

    /* 5. Listen for bid updates. 
        - The callback is a json object with:
             - all products
             - the product that was just bid on
             - current user object with updated tokens left 
             - error message or null if none 
             - Look at console log */
    mSocket.current.on('bid-update', (response) => {
        console.log(JSON.stringify(response));
        if(response.error == null){
          setProjects(response.products);
        }
        else{
          Alert.alert("Error",response.error);
        }
    });

    getProducts();

    return () => { 
        console.log('disconnecting socket'); 
        mSocket.current.disconnect(); 
    };
}, []);

  // const refresh = () => {
  //   getProducts();
  // };

  return (
    <View style={styles.container}>
      <View>
      <FlatList
        style={styles.flatList}
        data={projects} 
        renderItem={({item}) => <ProjectListItem project={item}  onPress={() => placeBid(item._id)}/>}
        />
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding:10,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
  },
  text: {
      padding: 20,
      fontSize: 20,
      fontWeight: '700',
      textAlign: 'center',
  },
  textInput: {
      fontSize: 18,
      padding: 15,
      marginTop: 5,
      marginBottom: 5,
      marginLeft: 20,
      marginRight: 20,
      borderWidth: 1,
      borderRadius: 15,
      height:50,
      borderColor: '#d3d3d3',
      width: '100%',
  },
  btn: {
      width: '100%',
      marginTop: 5,
      marginBottom:5,
  },
  imageContainer: {
      width: 200,
      height: 200,
      margin:20,
  },
  image: {
      width: 200,
      height: 200,
      resizeMode: 'cover',
      borderRadius:100,
  },
  flatList: {
    width:400,
},
});
