import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Alert, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CustomButton from '../Components/CustomButton';
import { currentUser , MongoCurUser } from '../Firebase/config';

const ProfileScreen = () => {

  const [UserFName, setFName] = useState('');
  const [UserLName, setLName] = useState('');
  const [Address,setAddress] = useState('');
  const [city,setCity] = useState('');
  const [province,setProvince] = useState('');
  const [postalCode,setPostalCode] = useState('');
  const [country,setcountry] = useState('');
  
  const onFNameChanged = (textInput) => setFName(textInput);
  const onLNameChanged = (textInput) => setLName(textInput);

  const onAddressChanged = (textInput) => setAddress(textInput);
  const onCityChanged = (textInput) => setCity(textInput);
  const onProvinceChanged = (textInput) => setProvince(textInput);
  const onPostalCodeChanged = (textInput) => setPostalCode(textInput);
  const onCountryChanged = (textInput) => setcountry(textInput);

  const getCurrentUser = () => {

    console.log("User From mongo ***"+MongoCurUser.lastName);
    
    // //Getting current User form MongoDB
    // axios.get('http://localhost:3000/users/email/'+CurUserEmail)
    // .then(function (response) {
    //   console.log("***userEmail***"+response.data.firstName);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });

  }

  return (
    <ScrollView>
          <View style={styles.container}>
            <Image source={require('../assets/profileDefault.png')} style={styles.image}></Image>

            <TextInput style={styles.textInput} placeholder='First Name' value={UserFName} onChangeText={onFNameChanged}></TextInput>
            <TextInput style={styles.textInput} placeholder='Last Name' value={UserLName} onChangeText={onLNameChanged}></TextInput>
            <TextInput style={styles.textInput} placeholder='Street Address' value={Address} onChangeText={onAddressChanged}></TextInput>
            <TextInput style={styles.textInput} placeholder='city' value={city} onChangeText={onCityChanged}></TextInput>
            <TextInput style={styles.textInput} placeholder='Provience' value={province} onChangeText={onProvinceChanged}></TextInput>
            <TextInput style={styles.textInput} placeholder='Postal Code' value={postalCode} onChangeText={onPostalCodeChanged}></TextInput>
            <TextInput style={styles.textInput} placeholder='Country' value={country} onChangeText={onCountryChanged}></TextInput> 

            <CustomButton style={styles.btn} title='Update' onPress={() => getCurrentUser()}/>
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
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius:75,
    margin:20,
  },
  btn: {
      width: '100%',
      marginTop: 10,
      marginBottom:10,
  },
});

export default ProfileScreen;