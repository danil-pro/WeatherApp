import React from 'react';
import Main from '../app/Main';
import Search from '../search/search';
import WeatherAPI from '../api/weatherApi';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function Navigate() {
    return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name="Search"
                component={Search}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Main"
                component={Main}
                options={{ headerShown: false }} />
            <Stack.Screen 
                name="WeatherAPI" 
                component={WeatherAPI} 
                options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer> );
}