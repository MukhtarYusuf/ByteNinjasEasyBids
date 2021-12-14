import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image ,Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';

import BiddingScreen from './Screens/BiddingScreen';
import ProfileScreen from './Screens/ProfileScreen';
import LoginScreen from './Screens/LoginScreen';
import UserRegisterScreen from './Screens/UserRegisterScreen'
import ResetPasswordScreen from './Screens/ResetPasswordScreen';
import AddToAuctionScreen from './Screens/AddToAuction';
import HowToUseScreen from './Screens/HowToUseScreen';
import ProductDetail from './Screens/ProductDetail';

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
        
                    if (route.name === 'Biddings') {
                        if (focused) {
                            return <Image source={require('./assets/bid.png')} style={{width: 35, height: 35}} />;
                        } else {
                            return <Image source={require('./assets/bid1.png')} style={{width: 35, height: 35}} />;
                        }
                    } else if (route.name === 'AddToAuctions') {
                        if (focused) {
                            return <Image source={require('./assets/sell.png')} style={{width: 35, height: 35}} />;
                        } else {
                            return <Image source={require('./assets/sell1.png')} style={{width: 35, height: 35}} />;
                        }
                    } else if (route.name === 'Profile') {
                        if (focused) {
                            return <Image source={require('./assets/profile.png')} style={{width: 35, height: 35}} />;
                        } else {
                            return <Image source={require('./assets/profile1.png')} style={{width: 35, height: 35}} />;
                        }
                    }
                    else if (route.name === 'How To Use') {
                        if (focused) {
                            return <Image source={require('./assets/instructions.png')} style={{width: 35, height: 35}} />;
                        } else {
                            return <Image source={require('./assets/instructions1.png')} style={{width: 35, height: 35}} />;
                        }
                    }
                },

                tabBarActiveTintColor: 'darkslateblue',
                tabBarInactiveTintColor: 'gray',
                
                headerStyle: {
                    backgroundColor: 'darkslateblue',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerShown: true,

            })}
        >
            <Tab.Screen name="Biddings" component={BiddingStackNavigator}/>
            <Tab.Screen name="AddToAuctions" component={AddToAuctionScreen}/>
            <Tab.Screen name="Profile" component={ProfileScreen}/>
            <Tab.Screen name="How To Use" component={HowToUseScreen}/>
            
        </Tab.Navigator>
    );
}

//Bidding Stack Navigator
const BiddingStackNavigator = () => {
    return (
        <ProjectsStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'darkslateblue',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerShown:false,
                headerRight: () => (
                    <Button
                      onPress={() => navigation.navigate("How To Use")}
                      title="How To Use"
                      color="#fff"
                    />
                  ),
            }}
        >
            <ProjectsStack.Screen name="Biddings" component={BiddingScreen}/>
            <ProjectsStack.Screen name="ProductDetail" component={ProductDetail}/>

        </ProjectsStack.Navigator>
    );
}


const Tab = createBottomTabNavigator();
const MainStack = createStackNavigator();
const ProjectsStack = createStackNavigator();

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

export default function App(navigation) {

    return (
        <NavigationContainer>
            <MainStack.Navigator
                screenOptions={{
                    headerStyle: {
                      backgroundColor: 'darkslateblue',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                    headerShown: false,
                }}>

                <MainStack.Screen name='Login Screen' 
                    component={LoginScreen}
                    options={{headerShown: false}}>
                </MainStack.Screen>

                <MainStack.Screen name='Home' 
                    component={TabNavigator}
                    options={{ headerShown: false ,
                    headerTitle:"EASY BIDS"}}>
                </MainStack.Screen> 

                <MainStack.Screen name='UserRegisterScreen' 
                    component={UserRegisterScreen}
                    options={{ headerShown: true }}>
                </MainStack.Screen>

                <MainStack.Screen name='ResetPasswordScreen' 
                    component={ResetPasswordScreen}
                    options={{ headerShown: true }}>
                </MainStack.Screen>

            </MainStack.Navigator>
            <StatusBar style="auto" />
        </NavigationContainer>
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
