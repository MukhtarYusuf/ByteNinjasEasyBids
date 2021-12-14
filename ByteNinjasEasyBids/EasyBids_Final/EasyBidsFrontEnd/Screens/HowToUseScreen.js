import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, Alert, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const AddEditProjectScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.textTop}>With Easy Bids you can..</Text>
        <Image source={require('../assets/3.png')} style={styles.Image}></Image>
        <Text style={styles.text}>Bid on products you need..</Text>
        <Image source={require('../assets/2.png')} style={styles.Image}></Image>
        <Text style={styles.text}>Auction products you want to sell while making great profit..</Text>
        <Image source={require('../assets/1.png')} style={styles.Image}></Image>
        <Text style={styles.text}>Or do both ..</Text>
        <Text style={styles.textTop}>Easy Returns</Text>
        <Text style={styles.text}>We want you to be compeletely satisfied with your purchase on Easy Bids. if you are not satisfied, you can return your product within 30 days.</Text>
        <Text style={styles.textTop}>Easy Bidding Process..</Text>
        <Image source={require('../assets/zeroDollar.png')} style={styles.Image}></Image>
        <Text style={styles.text}>Every Auction starts at $0..</Text>
        <Image source={require('../assets/bidding.png')} style={styles.Image}></Image>
        <Text style={styles.text}>Put your bid on any product you want..</Text>
        <Image source={require('../assets/win.png')} style={styles.Image}></Image>
        <Text style={styles.text}>Highest bid Wins!</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding:10,
      backgroundColor: '#fff',
      alignItems:'center'
  },
  textTop: {
    padding: 10,
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
  },
  text: {
      padding: 10,
      fontSize: 20,
      fontWeight: '500',
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
  },
  Image: {
    width:250,
    height:250,
    margin:20,
    resizeMode: 'contain',
  }
});

export default AddEditProjectScreen;