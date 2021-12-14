import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Alert, Button } from 'react-native';
import CustomButton from '../Components/CustomButton';
const axios = require('axios');

//ImagePicker Start ==========================================
import * as ImagePicker from 'expo-image-picker';
//ImagePicker End   ==========================================

const AddToAuction = () => {

  const [ProductName,setProductName] = useState('');
  const [ProductDescription,setProductDesc] = useState('');
  const [MinSellingPrice,setMinSellPrice] = useState('');

  //Image Picker Start ==============================================================
    
    // The path of the picked image
    const [pickedImagePath, setPickedImagePath] = useState('');

     // This function is triggered when the "Select an image" button pressed
    const showImagePicker = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  }

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  }

//Image Picker End ==============================================================

 //Custom Alert
 const CustomAlert = () =>
 Alert.alert(
   "Alert",
   "Where you want to get your image from?",
   [
     {
       text: "Device",
       onPress: () => showImagePicker()
     },
     {
       text: "Camera",
       onPress: () =>  openCamera()
     },
     { text: "Cancel", 
     onPress: () => console.log("Cancel pressed"),tyle: "cancel"}
   ]
 );

//reset Inputs 
const resetInputs = () => {
  setProductDesc('');
  setProductName('');
  setMinSellPrice('');
  setPickedImagePath('');
};

//Savind Products to MongoDB
const putToAuction = () => {
  if(ProductName && setProductDesc && MinSellingPrice !== ''){
    alert("Product Added for Auction");
    resetInputs();
    axios.post('http://localhost:3000/products/add', {
      name : ProductName,
      description : ProductDescription,
      sellerId : '',
      startTime : 0,
      duration : 300000,
      originalPrice : 0,
      biddingPrice : 0,
      minSellingPrice : MinSellingPrice,
      participants : [],
      winner : '',
      shippingStatus : 'product.shippingStatus',
      image: pickedImagePath,
   })
   .then(function (response) {
     console.log(response);
   })
   .catch(function (error) {
     console.log(error);
   });

  }
  else{
    alert("All fields are required");
  }
};

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {
          pickedImagePath !== '' && <Image
          source={{ uri: pickedImagePath }}
          style={styles.image}/>
        }
        {
          pickedImagePath === '' && <Image
          source={require('../assets/productDefault.png')}
          style={styles.image}/>

        }
      </View>

      <CustomButton style={styles.btn} title='Upload Product Image' onPress={CustomAlert}/>
      
      <TextInput style={styles.textInput} placeholder='Enter product Name' value={ProductName} onChangeText={setProductName}></TextInput>
      <TextInput style={styles.textInput} placeholder='Enter product Description' value={ProductDescription} onChangeText={setProductDesc}></TextInput>
      <TextInput style={styles.textInput} keyboardType = 'numeric' placeholder='Enter Minimum Selling price' value={MinSellingPrice} onChangeText={setMinSellPrice}></TextInput>

      <CustomButton style={styles.btn} title='Start Auction' onPress={putToAuction}/>
      <StatusBar style="auto" />

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
      marginTop: 10,
      marginBottom:10,
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
    borderRadius:10,
  }
});

export default AddToAuction;