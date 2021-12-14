import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Alert, Button } from 'react-native';
import CustomButton from '../Components/CustomButton';
import { firebase } from '../Firebase/config';
import { ScrollView } from 'react-native-gesture-handler';

const axios = require('axios');

//ImagePicker Start ==========================================
import * as ImagePicker from 'expo-image-picker';
//ImagePicker End ============================================

export default function UserRegisterScreen({navigation}) {

    const [UserFName, setFName] = useState('');
    const [UserLName, setLName] = useState('');
    const [UserEmail,setEmail] = useState('');
    const [UserPassword,setPassword] = useState('');

    const [Address,setAddress] = useState('');
    const [city,setCity] = useState('');
    const [province,setProvince] = useState('');
    const [postalCode,setPostalCode] = useState('');
    const [country,setcountry] = useState('');

    const onFNameChanged = (textInput) => setFName(textInput);
    const onLNameChanged = (textInput) => setLName(textInput);
    const onEmailChanged = (textInput) => setEmail(textInput);
    const onPasswordChanged = (textInput) => setPassword(textInput);
    
    const onAddressChanged = (textInput) => setAddress(textInput);
    const onCityChanged = (textInput) => setCity(textInput);
    const onProvinceChanged = (textInput) => setProvince(textInput);
    const onPostalCodeChanged = (textInput) => setPostalCode(textInput);
    const onCountryChanged = (textInput) => setcountry(textInput);


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

 //Create User
    const createNewUser = () => {
        if(UserFName || UserLName || UserEmail || UserPassword || Address || city || province || postalCode && country != ''){
            firebase.auth().createUserWithEmailAndPassword(UserEmail,UserPassword).then(() => {
                addUser();
                console.log('User account created & signed in!');
                navigation.navigate('Home');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    alert('That email address is already in use!');
                }
                if (error.code === 'auth/invalid-email') {
                    alert('That email address is invalid!');
                }
                if(error.code === 'auth/weak-password'){
                    alert('Password should be atleat 6 characters');
                }
                console.error(error);
            });
        }

        else{
            alert("All fields are required");
        }

    };


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

    //Add User Details to mongoDB
    const addUser = () => {
        axios.post('http://localhost:3000/users/add', {
            email: UserEmail,
            username: UserEmail,
            firstName: UserFName,
            lastName: UserLName,
            dob: 100,
            addressLine1: Address,
            addressLine2: '',
            city: city,
            state: province,
            country: country,
            zipCode: postalCode,
            tokens: 0,
            image: pickedImagePath
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    };

    return (
        <ScrollView>
            <View style={styles.container}>

                <View style={styles.imageContainer}>
                    {
                        pickedImagePath !== '' && <Image
                        source={{ uri: pickedImagePath }}
                        style={styles.image}/>

                    }
                    {
                        pickedImagePath === '' && <Image
                        source={require('../assets/profileDefault.png')}
                        style={styles.image}/>

                    }
                </View>

                <CustomButton style={styles.btn} title='Upload User Image' onPress={CustomAlert}/>

                <TextInput style={styles.textInput} placeholder='First Name' value={UserFName} onChangeText={onFNameChanged}></TextInput>
                <TextInput style={styles.textInput} placeholder='Last Name' value={UserLName} onChangeText={onLNameChanged}></TextInput>
                <TextInput style={styles.textInput} placeholder='Street Address' value={Address} onChangeText={onAddressChanged}></TextInput>
                <TextInput style={styles.textInput} placeholder='city' value={city} onChangeText={onCityChanged}></TextInput>
                <TextInput style={styles.textInput} placeholder='Provience' value={province} onChangeText={onProvinceChanged}></TextInput>
                <TextInput style={styles.textInput} placeholder='Postal Code' value={postalCode} onChangeText={onPostalCodeChanged}></TextInput>
                <TextInput style={styles.textInput} placeholder='Country' value={country} onChangeText={onCountryChanged}></TextInput>
                <TextInput style={styles.textInput} placeholder='Email' value={UserEmail.toLowerCase()} onChangeText={onEmailChanged}></TextInput>
                <TextInput style={styles.textInput} placeholder='Password' value={UserPassword.toLowerCase()} onChangeText={onPasswordChanged}></TextInput>
                <CustomButton style={styles.btn} title='Register' onPress={createNewUser}/>
                <StatusBar style="auto" />

            </View>
        </ScrollView>
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
    }
});
